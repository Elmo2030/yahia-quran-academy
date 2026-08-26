import 'package:flutter/material.dart';

import '../../../../core/theme/app_theme.dart';
import '../../domain/talaqqi_state.dart';

/// Large circular practice button for the child-led Talaqqi loop.
class MicButton extends StatelessWidget {
  final TalaqqiPhase phase;
  final VoidCallback onTap;

  const MicButton({super.key, required this.phase, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final isRecording = phase == TalaqqiPhase.childRecording;
    final isReview = phase == TalaqqiPhase.selfReview;
    final isBusy =
        phase == TalaqqiPhase.sheikhPlaying ||
        phase == TalaqqiPhase.analyzing ||
        isReview;

    final bgColor = isRecording || phase == TalaqqiPhase.idle
        ? AppColors.gold
        : phase == TalaqqiPhase.error
        ? AppColors.softOrange
        : AppColors.olive;

    final icon = isReview
        ? Icons.headphones_rounded
        : phase == TalaqqiPhase.error
        ? Icons.refresh_rounded
        : Icons.mic_rounded;
    final size = isRecording ? 88.0 : 76.0;

    final label = switch (phase) {
      TalaqqiPhase.childRecording => 'LISTENING...',
      TalaqqiPhase.sheikhPlaying => 'SHEIKH PLAYING',
      TalaqqiPhase.analyzing => 'CHECKING...',
      TalaqqiPhase.selfReview => 'SELF REVIEW',
      TalaqqiPhase.success => 'PRACTICE COMPLETE',
      TalaqqiPhase.error => 'TRY AGAIN',
      TalaqqiPhase.idle => 'TAP TO PRACTICE',
    };

    return Semantics(
      label: label,
      button: true,
      enabled: !isBusy,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          GestureDetector(
            onTap: isBusy ? null : onTap,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOutCubic,
              width: size,
              height: size,
              constraints: const BoxConstraints(minWidth: 48, minHeight: 48),
              decoration: BoxDecoration(
                color: bgColor,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: bgColor.withValues(alpha: 0.35),
                    blurRadius: isRecording ? 28 : 16,
                    spreadRadius: isRecording ? 4 : 0,
                  ),
                ],
              ),
              child: Icon(icon, color: Colors.white, size: 32),
            ),
          ),
          const SizedBox(height: 12),
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 200),
            child: Text(
              label,
              key: ValueKey(label),
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.05 * 12,
                color: AppColors.navy,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
