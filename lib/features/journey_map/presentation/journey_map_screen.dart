import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_theme.dart';
import '../../gamification/gamification_controller.dart';
import '../../gamification/widgets/reward_dialog.dart';
import '../../recitation/presentation/widgets/yahya_mascot.dart';
import '../domain/journey_state.dart';
import 'widgets/journey_node_card.dart';

class JourneyMapScreen extends ConsumerStatefulWidget {
  const JourneyMapScreen({super.key});

  @override
  ConsumerState<JourneyMapScreen> createState() => _JourneyMapScreenState();
}

class _JourneyMapScreenState extends ConsumerState<JourneyMapScreen> {
  String? _lastRewardedId;

  @override
  Widget build(BuildContext context) {
    final gState = ref.watch(gamificationProvider);

    // Trigger reward dialog when a level was just completed
    _checkRewardDialog(context, gState);

    return Scaffold(
      backgroundColor: AppColors.ivory,
      body: SafeArea(
        child: Column(
          children: [
            _JourneyTopBar(points: gState.totalPoints),
            Expanded(
              child: _SnakingPath(
                levels: gState.levels,
                onLevelTap: (level) {
                  if (level.status == LevelStatus.active) {
                    context.push('/recitation');
                  }
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const _JourneyBottomNav(),
    );
  }

  void _checkRewardDialog(BuildContext context, GamificationState gState) {
    final completedId = gState.justCompletedLevelId;
    if (completedId == null || completedId == _lastRewardedId) return;
    _lastRewardedId = completedId;

    // Find the completed level for its title
    final level = gState.levels.where((l) => l.id == completedId).firstOrNull;
    if (level == null) return;

    // Post-frame to avoid build-phase navigation
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      RewardDialog.show(
        context,
        levelTitle: level.title,
        pointsAwarded: 150,
        onContinue: () {
          Navigator.of(context).pop();
          ref.read(gamificationProvider.notifier).clearRewardFlag();
        },
      );
    });
  }
}

// ─────────────────────────────────────────────
// Top bar — Yahya avatar + points badge
// ─────────────────────────────────────────────

class _JourneyTopBar extends StatefulWidget {
  final int points;

  const _JourneyTopBar({required this.points});

  @override
  State<_JourneyTopBar> createState() => _JourneyTopBarState();
}

class _JourneyTopBarState extends State<_JourneyTopBar> {
  int _prevPoints = 0;

  @override
  void initState() {
    super.initState();
    _prevPoints = widget.points;
  }

  @override
  void didUpdateWidget(_JourneyTopBar old) {
    super.didUpdateWidget(old);
    if (old.points != widget.points) _prevPoints = old.points;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.olive, width: 2),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: Image.asset(
                      'assets/images/yahya_3d.png',
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => Container(
                        color: AppColors.gold.withValues(alpha: 0.1),
                        child: const Center(
                          child: Text('👦', style: TextStyle(fontSize: 20)),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Yehia Quran Academy',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: AppColors.navy,
                          letterSpacing: 0.3,
                        ),
                      ),
                      Text(
                        'Keep going, you\'re doing great!',
                        style: TextStyle(
                          fontSize: 12,
                          color: AppColors.navy.withValues(alpha: 0.45),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              TweenAnimationBuilder<int>(
                tween: IntTween(begin: _prevPoints, end: widget.points),
                duration: const Duration(milliseconds: 600),
                builder: (context, value, _) => Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(100),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.navy.withValues(alpha: 0.06),
                        blurRadius: 8,
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.star_rounded, color: AppColors.gold, size: 16),
                      const SizedBox(width: 4),
                      Text(
                        '$value',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                          color: AppColors.navy,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────
// Snaking path — vertical line + alternating cards
// ─────────────────────────────────────────────

class _SnakingPath extends StatelessWidget {
  final List<JourneyLevel> levels;
  final void Function(JourneyLevel) onLevelTap;

  const _SnakingPath({required this.levels, required this.onLevelTap});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      itemCount: levels.length,
      itemBuilder: (context, index) {
        final level = levels[index];
        final alignRight = index.isOdd;
        final isActive = level.status == LevelStatus.active;
        final isLast = index == levels.length - 1;

        return Column(
          children: [
            IntrinsicHeight(
              child: Row(
                children: [
                  if (alignRight) const Spacer(),
                  Stack(
                    clipBehavior: Clip.none,
                    children: [
                      JourneyNodeCard(
                        level: level,
                        onTap: () => onLevelTap(level),
                      ),
                      if (isActive)
                        Positioned(
                          right: -72,
                          top: 8,
                          child: YahyaMascot(size: 64),
                        ),
                    ],
                  ),
                  if (!alignRight) const Spacer(),
                ],
              ),
            ),
            if (!isLast)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: CustomPaint(
                  size: const Size(double.infinity, 40),
                  painter: _PathConnectorPainter(
                    fromRight: alignRight,
                    color: level.status == LevelStatus.completed
                        ? AppColors.gold.withValues(alpha: 0.4)
                        : AppColors.navy.withValues(alpha: 0.1),
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

class _PathConnectorPainter extends CustomPainter {
  final bool fromRight;
  final Color color;

  _PathConnectorPainter({required this.fromRight, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final startX = fromRight ? size.width * 0.6 : size.width * 0.4;
    final endX = fromRight ? size.width * 0.4 : size.width * 0.6;

    final path = Path()
      ..moveTo(startX, 0)
      ..cubicTo(startX, size.height * 0.5, endX, size.height * 0.5, endX, size.height);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(_PathConnectorPainter old) =>
      old.fromRight != fromRight || old.color != color;
}

// ─────────────────────────────────────────────
// Bottom nav — Learn (active), Daily, Library, Badges
// ─────────────────────────────────────────────

class _JourneyBottomNav extends StatelessWidget {
  const _JourneyBottomNav();

  void _showComingSoon(BuildContext context, String label) {
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(SnackBar(
        content: Text('$label — coming soon!'),
        duration: const Duration(seconds: 1),
        backgroundColor: AppColors.navy,
      ));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: AppColors.navy.withValues(alpha: 0.05),
            blurRadius: 16,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _NavItem(icon: Icons.school_rounded, label: 'Learn', isActive: true, onTap: () {}),
              _NavItem(icon: Icons.calendar_today_rounded, label: 'Daily', onTap: () => _showComingSoon(context, 'Daily')),
              _NavItem(icon: Icons.menu_book_rounded, label: 'Library', onTap: () => _showComingSoon(context, 'Library')),
              _NavItem(icon: Icons.emoji_events_rounded, label: 'Badges', onTap: () => _showComingSoon(context, 'Badges')),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final VoidCallback? onTap;

  const _NavItem({
    required this.icon,
    required this.label,
    this.isActive = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: label,
      button: true,
      selected: isActive,
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: isActive
                  ? const BoxDecoration(
                      color: AppColors.olive,
                      shape: BoxShape.circle,
                    )
                  : null,
              child: Icon(
                icon,
                color: isActive
                    ? Colors.white
                    : AppColors.navy.withValues(alpha: 0.55),
                size: 22,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
                color: isActive
                    ? AppColors.navy
                    : AppColors.navy.withValues(alpha: 0.55),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
