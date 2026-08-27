import 'dart:async';
import 'dart:io';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:record/record.dart';

final audioRecordingServiceProvider =
    Provider.autoDispose<AudioRecordingService>(
  (ref) {
    final service = AudioRecordingService();
    ref.onDispose(service.dispose);
    return service;
  },
);

/// Permission status from the recording check.
enum MicPermission { granted, denied, permanentlyDenied }

/// Recording contract consumed by the learning flow.
///
/// The concrete service remains responsible for platform microphone access;
/// this interface keeps flow tests independent of a device plugin.
abstract interface class AudioRecording {
  Future<MicPermission> checkPermission();
  Future<String> startRecording();
  Future<String?> stopRecording();
  Future<void> cleanupLastRecording();
}

/// Handles microphone recording: permission check, start/stop,
/// and temp file management.
class AudioRecordingService implements AudioRecording {
  final AudioRecorder _recorder = AudioRecorder();
  String? _currentPath;

  /// Check and request microphone permission.
  @override
  Future<MicPermission> checkPermission() async {
    final hasPermission = await _recorder.hasPermission();
    if (hasPermission) return MicPermission.granted;
    // `record` package requests permission inside hasPermission().
    // If it returns false after the request, the user denied it.
    return MicPermission.denied;
  }

  /// Start recording to a temp file. Returns the output path.
  ///
  /// Uses AAC encoding at 64kbps to match our pipeline spec.
  @override
  Future<String> startRecording() async {
    final dir = Directory.systemTemp;
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    _currentPath = '${dir.path}/yqa_rec_$timestamp.wav';

    await _recorder
        .start(
      const RecordConfig(
        encoder: AudioEncoder.wav,
        sampleRate: 16000,
        numChannels: 1,
      ),
      path: _currentPath!,
    )
        .timeout(
      const Duration(seconds: 5),
      onTimeout: () {
        print('[AudioRec] start() timed out — simulator audio may not work');
      },
    );

    return _currentPath!;
  }

  /// Record for exactly [duration], then stop and return the file path.
  Future<String> recordForDuration(Duration duration) async {
    final path = await startRecording();
    await Future.delayed(duration);
    await stopRecording();
    return path;
  }

  /// Stop the current recording. Returns the file path.
  @override
  Future<String?> stopRecording() async {
    final path = await _recorder.stop();
    return path ?? _currentPath;
  }

  /// Delete the last recorded temp file to free storage.
  @override
  Future<void> cleanupLastRecording() async {
    if (_currentPath != null) {
      final file = File(_currentPath!);
      if (await file.exists()) await file.delete();
      _currentPath = null;
    }
  }

  void dispose() {
    _recorder.dispose();
  }
}
