import 'dart:math';

import 'package:flutter/material.dart';

import '../../../../core/theme/app_theme.dart';
import '../../domain/talaqqi_state.dart';

/// Vertical bar visualizer that changes color per Talaqqi practice stage.
class AudioVisualizer extends StatelessWidget {
  final TalaqqiPhase phase;
  final double progress;

  const AudioVisualizer({
    super.key,
    required this.phase,
    required this.progress,
  });

  Color get _primaryColor => switch (phase) {
    TalaqqiPhase.sheikhPlaying => AppColors.navy,
    TalaqqiPhase.childRecording => AppColors.olive,
    TalaqqiPhase.analyzing => AppColors.gold,
    TalaqqiPhase.selfReview => AppColors.olive,
    TalaqqiPhase.success => AppColors.olive,
    TalaqqiPhase.error => AppColors.softOrange,
    TalaqqiPhase.idle => AppColors.navy.withValues(alpha: 0.12),
  };

  Color get _accentColor => switch (phase) {
    TalaqqiPhase.sheikhPlaying => AppColors.olive.withValues(alpha: 0.6),
    TalaqqiPhase.childRecording => AppColors.gold,
    TalaqqiPhase.analyzing => AppColors.olive,
    TalaqqiPhase.selfReview => AppColors.gold.withValues(alpha: 0.6),
    _ => AppColors.gold.withValues(alpha: 0.3),
  };

  @override
  Widget build(BuildContext context) {
    final isAnimating =
        phase == TalaqqiPhase.sheikhPlaying ||
        phase == TalaqqiPhase.childRecording;

    const barCount = 9;
    const maxHeight = 56.0;

    return SizedBox(
      height: maxHeight,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: List.generate(barCount, (i) {
          final centeredness =
              1.0 - ((i - barCount / 2).abs() / (barCount / 2));
          final baseRatio = 0.25 + (0.75 * centeredness);
          final animatedRatio = isAnimating
              ? baseRatio *
                    (0.5 + 0.5 * sin((progress * 8 * pi) + (i * 0.7)).abs())
              : baseRatio * 0.6;
          final color = i.isEven ? _primaryColor : _accentColor;

          return AnimatedContainer(
            duration: const Duration(milliseconds: 80),
            margin: const EdgeInsets.symmetric(horizontal: 3),
            width: 8,
            height: maxHeight * animatedRatio.clamp(0.15, 1.0),
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(4),
            ),
          );
        }),
      ),
    );
  }
}
