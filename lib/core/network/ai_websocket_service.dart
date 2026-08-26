import 'dart:async';
import 'dart:convert';
import 'dart:math';
import 'dart:typed_data';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

import '../constants/app_constants.dart';

final aiWebSocketProvider = Provider.autoDispose<AiWebSocketService>((ref) {
  final service = AiWebSocketService();
  ref.onDispose(service.disconnect);
  return service;
});

/// Bi-directional WebSocket client for the Python AI engine.
///
/// Protocol:
/// - Client sends: base64-encoded audio chunks (every 500ms per spec)
/// - Client sends: `{"type":"end_stream"}` when recording stops
/// - Server responds: JSON `{"score": 95.5, "mistakes": [...]}`
///
/// Reconnects automatically with exponential backoff on connection loss.
class AiWebSocketService {
  WebSocketChannel? _channel;
  final _responseCtrl = StreamController<Map<String, dynamic>>.broadcast();
  StreamSubscription? _listenSub;

  bool _isConnected = false;
  int _reconnectAttempts = 0;
  static const _maxReconnectAttempts = 5;

  /// Stream of parsed AI evaluation responses.
  Stream<Map<String, dynamic>> get responses => _responseCtrl.stream;
  bool get isConnected => _isConnected;

  /// Connect to the AI engine WebSocket.
  Future<void> connect() async {
    if (_isConnected) return;

    try {
      final uri = Uri.parse(AppConstants.aiEngineWsUrl);
      print('[AiWS] Connecting to $uri');
      _channel = WebSocketChannel.connect(uri);
      await _channel!.ready;
      print('[AiWS] Connected successfully');

      _isConnected = true;
      _reconnectAttempts = 0;

      _listenSub = _channel!.stream.listen(
        (data) {
          try {
            final json = jsonDecode(data as String) as Map<String, dynamic>;
            _responseCtrl.add(json);
          } catch (_) {
            // Malformed response — skip
          }
        },
        onError: (_) => _handleDisconnect(),
        onDone: () => _handleDisconnect(),
      );
    } catch (e, st) {
      print('[AiWS] Connection failed: $e');
      print('[AiWS] Stack: $st');
      _isConnected = false;
      await _attemptReconnect();
    }
  }

  /// Send a raw audio chunk (bytes) to the AI engine as base64.
  void streamAudioChunk(Uint8List chunk) {
    if (!_isConnected || _channel == null) return;
    _channel!.sink.add(base64Encode(chunk));
  }

  /// Signal end of audio stream and await the evaluation response.
  /// Returns null if the AI doesn't respond within [timeout].
  Future<Map<String, dynamic>?> endStreamAndAwaitResult({
    Duration timeout = const Duration(milliseconds: 1500),
    Duration extendedTimeout = const Duration(milliseconds: 4000),
  }) async {
    if (!_isConnected || _channel == null) return null;

    _channel!.sink.add(jsonEncode({'type': 'end_stream'}));

    try {
      return await responses.first.timeout(
        extendedTimeout,
        onTimeout: () => <String, dynamic>{},
      );
    } catch (_) {
      return null;
    }
  }

  /// Gracefully close the connection.
  void disconnect() {
    _isConnected = false;
    _listenSub?.cancel();
    _channel?.sink.close();
    _channel = null;
  }

  void _handleDisconnect() {
    _isConnected = false;
    _listenSub?.cancel();
    _attemptReconnect();
  }

  /// Exponential backoff: 1s, 2s, 4s, 8s, 16s, then give up.
  Future<void> _attemptReconnect() async {
    if (_reconnectAttempts >= _maxReconnectAttempts) return;

    _reconnectAttempts++;
    final delay = Duration(seconds: pow(2, _reconnectAttempts - 1).toInt());
    await Future.delayed(delay);

    await connect();
  }
}
