import 'package:flutter/material.dart';

import '../../../../core/constants/app_constants.dart';
import '../../../../core/theme/app_theme.dart';
import '../../domain/journey_state.dart';

/// A single node on the journey path.
///
/// Stitch reference:
/// - Locked: white card, dimmed, centered lock icon, no border
/// - Active: olive green 2px border, large olive mic circle, 3 dot indicator
/// - Completed: white card, gold check badge (top-right), icon + gold progress bar
class JourneyNodeCard extends StatefulWidget {
  final JourneyLevel level;
  final VoidCallback? onTap;

  const JourneyNodeCard({super.key, required this.level, this.onTap});

  @override
  State<JourneyNodeCard> createState() => _JourneyNodeCardState();
}

class _JourneyNodeCardState extends State<JourneyNodeCard>
    with TickerProviderStateMixin {
  late final AnimationController _pulseCtrl;
  late final AnimationController _glowCtrl;

  @override
  void initState() {
    super.initState();
    _pulseCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    );
    _glowCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2200),
    );
    if (widget.level.status == LevelStatus.active) {
      _pulseCtrl.repeat(reverse: true);
    }
    if (widget.level.status == LevelStatus.completed) {
      _glowCtrl.repeat(reverse: true);
    }
  }

  @override
  void didUpdateWidget(JourneyNodeCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    // React to status transitions (e.g. active → completed after score)
    if (widget.level.status != oldWidget.level.status) {
      _pulseCtrl.stop();
      _glowCtrl.stop();
      if (widget.level.status == LevelStatus.active) {
        _pulseCtrl.repeat(reverse: true);
      }
      if (widget.level.status == LevelStatus.completed) {
        _glowCtrl.repeat(reverse: true);
      }
    }
  }

  @override
  void dispose() {
    _pulseCtrl.dispose();
    _glowCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final level = widget.level;
    final isLocked = level.status == LevelStatus.locked;
    final isActive = level.status == LevelStatus.active;
    final isCompleted = level.status == LevelStatus.completed;

    return Semantics(
      label: '${level.title}, ${level.status.name}',
      button: !isLocked,
      enabled: !isLocked,
      child: GestureDetector(
        onTap: isLocked ? null : widget.onTap,
        child: AnimatedBuilder(
          animation: Listenable.merge([_pulseCtrl, _glowCtrl]),
          builder: (context, child) {
            final scale = isActive ? 1.0 + (_pulseCtrl.value * 0.02) : 1.0;

            return AnimatedOpacity(
              opacity: isLocked ? 0.5 : 1.0,
              duration: const Duration(milliseconds: 400),
              child: Transform.scale(
                scale: scale,
                child: _buildCard(isLocked, isActive, isCompleted, level),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildCard(
    bool isLocked,
    bool isActive,
    bool isCompleted,
    JourneyLevel level,
  ) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        Container(
          width: 220,
          padding: EdgeInsets.symmetric(
            horizontal: 24,
            vertical: isActive ? 28 : 20,
          ),
          decoration: BoxDecoration(
            color: isLocked
                ? Colors.white.withValues(alpha: 0.6)
                : Colors.white,
            borderRadius:
                BorderRadius.circular(AppConstants.cornerRadiusLarge),
            border: isActive
                ? Border.all(color: AppColors.olive, width: 2)
                : null,
            boxShadow: [
              if (!isLocked)
                BoxShadow(
                  color: isCompleted
                      ? AppColors.gold.withValues(
                          alpha: 0.1 + (_glowCtrl.value * 0.12))
                      : AppColors.navy.withValues(alpha: 0.05),
                  blurRadius: isCompleted ? 20 + (_glowCtrl.value * 8) : 16,
                  offset: const Offset(0, 4),
                ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _NodeIcon(iconType: level.iconType, isActive: isActive),
              const SizedBox(height: 10),
              Text(
                level.title,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: isLocked
                      ? AppColors.navy.withValues(alpha: 0.35)
                      : AppColors.navy,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                level.subtitle,
                style: TextStyle(
                  fontSize: 12,
                  color: AppColors.navy.withValues(alpha: isLocked ? 0.25 : 0.5),
                ),
              ),
              if (isCompleted) ...[
                const SizedBox(height: 10),
                _GoldProgressBar(progress: level.progress),
              ],
              if (isActive) ...[
                const SizedBox(height: 10),
                _DotIndicator(),
              ],
            ],
          ),
        ),

        // Gold check badge for completed levels (top-right)
        if (isCompleted)
          Positioned(
            top: -8,
            right: -8,
            child: Container(
              width: 28,
              height: 28,
              decoration: const BoxDecoration(
                color: AppColors.gold,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.check_rounded,
                color: Colors.white,
                size: 16,
              ),
            ),
          ),
      ],
    );
  }
}

/// Centered icon for each node type.
class _NodeIcon extends StatelessWidget {
  final IconType iconType;
  final bool isActive;

  const _NodeIcon({required this.iconType, required this.isActive});

  @override
  Widget build(BuildContext context) {
    final (icon, bgColor, iconColor, size) = switch (iconType) {
      // Active: large olive circle with white mic
      IconType.mic => (
          Icons.mic_rounded,
          AppColors.olive,
          Colors.white,
          isActive ? 56.0 : 44.0,
        ),
      IconType.book => (
          Icons.menu_book_rounded,
          AppColors.gold.withValues(alpha: 0.15),
          AppColors.gold,
          44.0,
        ),
      IconType.star => (
          Icons.star_rounded,
          AppColors.gold.withValues(alpha: 0.15),
          AppColors.gold,
          44.0,
        ),
      IconType.lock => (
          Icons.lock_rounded,
          AppColors.navy.withValues(alpha: 0.08),
          AppColors.navy.withValues(alpha: 0.3),
          44.0,
        ),
    };

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: bgColor,
        shape: BoxShape.circle,
      ),
      child: Icon(icon, color: iconColor, size: size * 0.45),
    );
  }
}

/// Gold progress bar beneath completed nodes.
class _GoldProgressBar extends StatelessWidget {
  final double progress;

  const _GoldProgressBar({required this.progress});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(4),
      child: SizedBox(
        height: 6,
        width: 100,
        child: LinearProgressIndicator(
          value: progress,
          backgroundColor: AppColors.gold.withValues(alpha: 0.15),
          valueColor: const AlwaysStoppedAnimation(AppColors.gold),
        ),
      ),
    );
  }
}

/// Three-dot indicator beneath the active node.
class _DotIndicator extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(
        3,
        (i) => Container(
          margin: const EdgeInsets.symmetric(horizontal: 3),
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            color: AppColors.olive.withValues(alpha: i == 1 ? 1.0 : 0.3),
            shape: BoxShape.circle,
          ),
        ),
      ),
    );
  }
}

