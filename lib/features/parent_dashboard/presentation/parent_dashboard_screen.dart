import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_theme.dart';
import '../domain/dashboard_state.dart';
import '../domain/parent_dashboard_controller.dart';
import 'widgets/kpi_card.dart';
import 'widgets/weekly_chart.dart';

/// Parent Analytics Dashboard — data-rich progress overview.
///
/// Stitch reference (parent_analytics_dashboard_1/screen.png):
///   - Top: avatar + points + hamburger
///   - "Progress Overview" heading (serif font)
///   - Filter pills: "This Week" / "Download Report"
///   - KPI cards: Total Minutes, Tajweed Accuracy, Current Focus
///   - Weekly Engagement chart (navy card, area chart)
///   - Gentle Reminders section (specific tajweed corrections)
///   - Bottom nav: Overview, Progress (active), Schedule, Settings
class ParentDashboardScreen extends ConsumerWidget {
  const ParentDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncState = ref.watch(dashboardDataProvider);

    return asyncState.when(
      loading: () => const Scaffold(
        backgroundColor: AppColors.ivory,
        body: Center(child: CircularProgressIndicator(color: AppColors.olive)),
      ),
      error: (e, _) => Scaffold(
        backgroundColor: AppColors.ivory,
        body: Center(child: Text('Error loading dashboard: $e')),
      ),
      data: (state) => _buildDashboard(context, state),
    );
  }

  Widget _buildDashboard(BuildContext context, DashboardState state) {
    return Scaffold(
      backgroundColor: AppColors.ivory,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // Top bar
            SliverToBoxAdapter(child: _DashboardTopBar()),
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              sliver: SliverList(
                delegate: SliverChildListDelegate([
                  const SizedBox(height: 24),

                  // Title — Source Serif 4 per Stitch spec
                  const Text(
                    'Progress\nOverview',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.w700,
                      fontFamily: 'Source Serif 4',
                      color: AppColors.navy,
                      height: 1.15,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    "Tracking your child's learning journey this week.",
                    style: TextStyle(
                      fontSize: 16,
                      color: AppColors.navy.withValues(alpha: 0.5),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Filter pills
                  _FilterPills(),
                  const SizedBox(height: 24),

                  // KPI: Total Minutes Listened
                  KpiCard(
                    title: 'Total Minutes Listened',
                    value: state.totalMinutes.toString(),
                    unit: 'mins',
                    subtitle:
                        '↗ +${state.minutesChangePercent.toStringAsFixed(0)}% from last week',
                    icon: Icons.headphones_rounded,
                  ),
                  const SizedBox(height: 16),

                  // KPI: Tajweed Accuracy
                  KpiCard(
                    title: 'Tajweed Accuracy',
                    value: '${state.tajweedAccuracy.toStringAsFixed(0)}',
                    unit: '%',
                    subtitle: state.accuracyNote,
                    icon: Icons.verified_rounded,
                    iconBgColor: AppColors.olive.withValues(alpha: 0.1),
                    bottomWidget: ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: state.tajweedAccuracy / 100,
                        minHeight: 6,
                        backgroundColor:
                            AppColors.olive.withValues(alpha: 0.1),
                        valueColor:
                            const AlwaysStoppedAnimation(AppColors.olive),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // KPI: Current Focus
                  _CurrentFocusCard(surahs: state.currentFocus),
                  const SizedBox(height: 24),

                  // Weekly Engagement Chart
                  WeeklyChart(
                    minutes: state.weeklyMinutes,
                    goals: state.weeklyGoals,
                    days: state.weekDays,
                  ),
                  const SizedBox(height: 24),

                  // Gentle Reminders
                  _GentleRemindersSection(reminders: state.reminders),
                  const SizedBox(height: 32),
                ]),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const _ParentBottomNav(),
    );
  }
}

// ─────────────────────────────────────────────
// Top bar — avatar + points + menu
// ─────────────────────────────────────────────

class _DashboardTopBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Row(
        children: [
          // Parent avatar placeholder
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.navy.withValues(alpha: 0.1),
              border: Border.all(
                color: AppColors.gold.withValues(alpha: 0.3),
                width: 2,
              ),
            ),
            child: const Icon(Icons.person_rounded,
                color: AppColors.navy, size: 22),
          ),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
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
            child: const Text(
              '1,250 pts',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: AppColors.navy,
              ),
            ),
          ),
          const SizedBox(width: 12),
          Icon(
            Icons.menu_rounded,
            color: AppColors.navy.withValues(alpha: 0.6),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────
// Filter pills — "This Week" + "Download Report"
// ─────────────────────────────────────────────

class _FilterPills extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // Inactive pill
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(100),
            border: Border.all(
              color: AppColors.navy.withValues(alpha: 0.1),
            ),
          ),
          child: Text(
            'This Week',
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w500,
              color: AppColors.navy.withValues(alpha: 0.6),
            ),
          ),
        ),
        const SizedBox(width: 8),
        // Active/CTA pill
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(
            color: AppColors.navy,
            borderRadius: BorderRadius.circular(100),
          ),
          child: const Text(
            'Download Report',
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────
// Current Focus card
// ─────────────────────────────────────────────

class _CurrentFocusCard extends StatelessWidget {
  final List<FocusSurah> surahs;

  const _CurrentFocusCard({required this.surahs});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusLarge),
        boxShadow: [
          BoxShadow(
            color: AppColors.navy.withValues(alpha: 0.05),
            blurRadius: 20,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Current Focus',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: AppColors.navy.withValues(alpha: 0.6),
                ),
              ),
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.navy.withValues(alpha: 0.06),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.menu_book_rounded,
                    color: AppColors.navy, size: 20),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ...surahs.map((s) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            color: AppColors.olive,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 10),
                        Text(
                          s.name,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w500,
                            color: AppColors.navy,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.olive.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(100),
                      ),
                      child: Text(
                        s.tag,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: AppColors.olive,
                        ),
                      ),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────
// Gentle Reminders — navy bg with orange accent
// ─────────────────────────────────────────────

class _GentleRemindersSection extends StatelessWidget {
  final List<GentleReminder> reminders;

  const _GentleRemindersSection({required this.reminders});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Gentle Reminders',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            fontFamily: 'Source Serif 4',
            color: AppColors.navy,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          "Areas where your child could use a little extra encouragement.",
          style: TextStyle(
            fontSize: 14,
            color: AppColors.navy.withValues(alpha: 0.5),
          ),
        ),
        const SizedBox(height: 16),
        ...reminders.map((r) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius:
                      BorderRadius.circular(AppConstants.cornerRadiusLarge),
                  border: Border.all(
                    color: AppColors.softOrange.withValues(alpha: 0.2),
                  ),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Orange accent dot
                    Container(
                      margin: const EdgeInsets.only(top: 4),
                      width: 10,
                      height: 10,
                      decoration: const BoxDecoration(
                        color: AppColors.softOrange,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            r.title,
                            style: const TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w600,
                              color: AppColors.navy,
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            r.body,
                            style: TextStyle(
                              fontSize: 13,
                              height: 1.5,
                              color: AppColors.navy.withValues(alpha: 0.6),
                            ),
                          ),
                          if (r.actionLabel != null) ...[
                            const SizedBox(height: 10),
                            Row(
                              children: [
                                Icon(
                                  Icons.play_circle_rounded,
                                  size: 16,
                                  color: AppColors.softOrange,
                                ),
                                const SizedBox(width: 6),
                                Text(
                                  r.actionLabel!,
                                  style: const TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.softOrange,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            )),
      ],
    );
  }
}

// ─────────────────────────────────────────────
// Bottom nav — Overview, Progress (active), Schedule, Settings
// ─────────────────────────────────────────────

class _ParentBottomNav extends StatelessWidget {
  const _ParentBottomNav();

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
              _ParentNavItem(icon: Icons.grid_view_rounded, label: 'Overview', onTap: () => _showComingSoon(context, 'Overview')),
              _ParentNavItem(
                icon: Icons.show_chart_rounded,
                label: 'Progress',
                isActive: true,
                onTap: () {},
              ),
              _ParentNavItem(
                  icon: Icons.calendar_today_rounded, label: 'Schedule', onTap: () => _showComingSoon(context, 'Schedule')),
              _ParentNavItem(
                  icon: Icons.settings_rounded, label: 'Settings', onTap: () => _showComingSoon(context, 'Settings')),
            ],
          ),
        ),
      ),
    );
  }
}

class _ParentNavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final VoidCallback? onTap;

  const _ParentNavItem({
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
                      color: AppColors.navy,
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
