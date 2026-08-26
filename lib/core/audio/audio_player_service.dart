import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:just_audio/just_audio.dart';

final audioPlayerServiceProvider = Provider.autoDispose<AudioPlayerService>(
  (ref) {
    final service = AudioPlayerService();
    ref.onDispose(service.dispose);
    return service;
  },
);

/// Wraps `just_audio` to play a specific ayah segment by seeking to
/// start_ms and stopping at end_ms. Audio is streamed from Supabase
/// Storage (or a local cache path).
class AudioPlayerService {
  final AudioPlayer _player = AudioPlayer();
  Timer? _endTimer;

  /// Current playback position stream — drives the visualizer.
  Stream<Duration> get positionStream => _player.positionStream;
  Stream<PlayerState> get playerStateStream => _player.playerStateStream;

  /// Load an audio source. Accepts a Supabase storage URL or local file path.
  Future<void> load(String url) async {
    if (url.startsWith('http')) {
      await _player.setUrl(url);
    } else {
      await _player.setFilePath(url);
    }
  }

  /// Play a segment from [startMs] to [endMs].
  /// Returns a Future that completes when the segment finishes.
  Future<void> playSegment({
    required int startMs,
    required int endMs,
  }) async {
    final completer = Completer<void>();

    await _player.seek(Duration(milliseconds: startMs));
    await _player.play();

    final duration = endMs - startMs;
    _endTimer?.cancel();
    _endTimer = Timer(Duration(milliseconds: duration), () async {
      await _player.pause();
      if (!completer.isCompleted) completer.complete();
    });

    // Also complete if playback finishes naturally (short clip edge case)
    late final StreamSubscription<PlayerState> sub;
    sub = _player.playerStateStream.listen((state) {
      if (state.processingState == ProcessingState.completed) {
        sub.cancel();
        if (!completer.isCompleted) completer.complete();
      }
    });

    await completer.future;
    sub.cancel();
  }

  /// Starts full-surah playback when no ayah timing metadata is available.
  /// This intentionally does not infer an end position or claim ayah-level
  /// navigation; callers must expose it as whole-surah listening only.
  Future<void> playWhole() async {
    _endTimer?.cancel();
    await _player.seek(Duration.zero);
    await _player.play();
  }

  Future<void> stop() async {
    _endTimer?.cancel();
    await _player.stop();
  }

  void dispose() {
    _endTimer?.cancel();
    _player.dispose();
  }
}
