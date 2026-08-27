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

/// Playback contract consumed by the learning flow.
///
/// Keeping this narrow interface separate from `just_audio` makes source
/// switching testable without loading a platform audio plugin.
abstract interface class AudioPlayback {
  Stream<Duration> get positionStream;
  Stream<bool> get playingStream;

  Future<void> load(String url);
  Future<void> playSegment({required int startMs, required int endMs});
  Future<void> playWhole();
  Future<void> pause();
  Future<void> stopAndReset();
  Future<void> stop();
}

/// Wraps `just_audio` to play a specific ayah segment by seeking to
/// start_ms and stopping at end_ms. Audio is streamed from public R2
/// storage (or a local cache path).
class AudioPlayerService implements AudioPlayback {
  final AudioPlayer _player = AudioPlayer();
  Timer? _endTimer;

  /// Current playback position stream — drives the visualizer.
  @override
  Stream<Duration> get positionStream => _player.positionStream;

  @override
  Stream<bool> get playingStream => _player.playingStream;
  Stream<PlayerState> get playerStateStream => _player.playerStateStream;

  /// Load an audio source. Accepts a Supabase storage URL or local file path.
  @override
  Future<void> load(String url) async {
    if (url.startsWith('http')) {
      await _player.setUrl(url);
    } else {
      await _player.setFilePath(url);
    }
  }

  /// Play a segment from [startMs] to [endMs].
  /// Returns a Future that completes when the segment finishes.
  @override
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
  @override
  Future<void> playWhole() async {
    _endTimer?.cancel();
    await _player.seek(Duration.zero);
    await _player.play();
  }

  @override
  Future<void> pause() async {
    _endTimer?.cancel();
    await _player.pause();
  }

  /// Stops the current library and resets the position before another source
  /// can be loaded. This prevents a recitation switch from continuing old audio.
  @override
  Future<void> stopAndReset() async {
    _endTimer?.cancel();
    await _player.pause();
    await _player.seek(Duration.zero);
  }

  @override
  Future<void> stop() async {
    _endTimer?.cancel();
    await _player.stop();
  }

  void dispose() {
    _endTimer?.cancel();
    _player.dispose();
  }
}
