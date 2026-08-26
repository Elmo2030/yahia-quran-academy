import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_theme.dart';
import '../domain/dashboard_state.dart';
import '../domain/parent_dashboard_controller.dart';
import 'widgets/kpi_card.dart';
import 'widgets/weekly_chart.dart';

/// Parent dashboard grounded in persisted child practice activity.
class ParentDashboardScreen extends ConsumerWidget {
  const ParentDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(dashboardDataProvider);
    return state.when(
      loading: () => const Scaffold(
        backgroundColor: AppColors.ivory,
        body: Center(child: CircularProgressIndicator(color: AppColors.olive)),
      ),
      error: (_, __) => const _ParentScaffold(
        child: _MessageCard(
          title: 'تعذّر تحميل النشاط',
          body: 'ستظهر جلسات التدريب عند توفر اتصال آمن بالحساب.',
        ),
      ),
      data: (data) => _ParentScaffold(child: _DashboardContent(state: data)),
    );
  }
}

class _ParentScaffold extends StatelessWidget {
  final Widget child;

  const _ParentScaffold({required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.ivory,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              sliver: SliverToBoxAdapter(child: child),
            ),
          ],
        ),
      ),
    );
  }
}

class _DashboardContent extends StatelessWidget {
  final DashboardState state;

  const _DashboardContent({required this.state});

  @override
  Widget build(BuildContext context) {
    final trend = state.minutesChangePercent;
    final trendText = trend == 0
        ? 'لا توجد مقارنة كافية بالأسبوع السابق'
        : '${trend.isNegative ? '↓' : '↑'} ${trend.abs().toStringAsFixed(0)}% مقارنة بالأسبوع السابق';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 20),
        const _TopBar(),
        const SizedBox(height: 24),
        const Text(
          'متابعة التدريب',
          style: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.w700,
            fontFamily: 'Source Serif 4',
            color: AppColors.navy,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'هذه البيانات تصف وقت التدرّب والمراجعة الذاتية؛ لا تمثل حكمًا آليًا على الإتقان.',
          style: TextStyle(
            fontSize: 15,
            height: 1.45,
            color: AppColors.navy.withValues(alpha: 0.62),
          ),
        ),
        const SizedBox(height: 24),
        KpiCard(
          title: 'وقت التدريب هذا الأسبوع',
          value: '${state.totalMinutes}',
          unit: 'دقيقة',
          subtitle: trendText,
          icon: Icons.timer_outlined,
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _CompactMetric(
                title: 'جلسات مسجلة',
                value: '${state.sessionCount}',
                icon: Icons.menu_book_rounded,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _CompactMetric(
                title: 'محاولات تكرار',
                value: '${state.totalAttempts}',
                icon: Icons.repeat_rounded,
              ),
            ),
          ],
        ),
        const SizedBox(height: 24),
        WeeklyChart(minutes: state.weeklyMinutes, days: state.weekDays),
        const SizedBox(height: 24),
        _FocusCard(surahs: state.currentFocus),
        const SizedBox(height: 24),
        _RecentPracticeSection(highlights: state.recentPractice),
        const SizedBox(height: 32),
      ],
    );
  }
}

class _TopBar extends StatelessWidget {
  const _TopBar();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.navy.withValues(alpha: 0.08),
            border: Border.all(
              color: AppColors.gold.withValues(alpha: 0.3),
              width: 2,
            ),
          ),
          child:
              const Icon(Icons.family_restroom_rounded, color: AppColors.navy),
        ),
        const Spacer(),
        Text(
          'لوحة ولي الأمر',
          style: TextStyle(
            color: AppColors.navy.withValues(alpha: 0.65),
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}

class _CompactMetric extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;

  const _CompactMetric({
    required this.title,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusLarge),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppColors.olive),
          const SizedBox(height: 14),
          Text(
            value,
            style: const TextStyle(
              color: AppColors.navy,
              fontSize: 25,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            title,
            style: TextStyle(color: AppColors.navy.withValues(alpha: 0.6)),
          ),
        ],
      ),
    );
  }
}

class _FocusCard extends StatelessWidget {
  final List<FocusSurah> surahs;

  const _FocusCard({required this.surahs});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusLarge),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.menu_book_rounded, color: AppColors.olive),
              SizedBox(width: 8),
              Text(
                'السور التي تدرّب عليها الطفل',
                style: TextStyle(
                  color: AppColors.navy,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          if (surahs.isEmpty)
            Text(
              'لا توجد جلسات مسجلة هذا الأسبوع بعد.',
              style: TextStyle(color: AppColors.navy.withValues(alpha: 0.6)),
            )
          else
            ...surahs.map(
              (surah) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Row(
                  children: [
                    const Icon(Icons.circle, size: 8, color: AppColors.olive),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        surah.name,
                        style: const TextStyle(color: AppColors.navy),
                      ),
                    ),
                    Text(
                      surah.tag,
                      style: TextStyle(
                        color: AppColors.navy.withValues(alpha: 0.6),
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _RecentPracticeSection extends StatelessWidget {
  final List<PracticeHighlight> highlights;

  const _RecentPracticeSection({required this.highlights});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'أحدث جلسات التدريب',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            fontFamily: 'Source Serif 4',
            color: AppColors.navy,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          'ملخصات نشاط، وليست ملاحظات تصحيح أو تقييم جودة التلاوة.',
          style: TextStyle(color: AppColors.navy.withValues(alpha: 0.6)),
        ),
        const SizedBox(height: 14),
        if (highlights.isEmpty)
          const _MessageCard(
            title: 'لا توجد جلسات بعد',
            body: 'ستظهر هنا ملخصات التدريب عند تسجيل أول جلسة.',
          )
        else
          ...highlights.map(
            (highlight) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: AppColors.olive.withValues(alpha: 0.14),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      highlight.title,
                      style: const TextStyle(
                        color: AppColors.navy,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      highlight.body,
                      style: TextStyle(
                        color: AppColors.navy.withValues(alpha: 0.62),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }
}

class _MessageCard extends StatelessWidget {
  final String title;
  final String body;

  const _MessageCard({required this.title, required this.body});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusLarge),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.hourglass_empty_rounded,
            color: AppColors.olive,
            size: 36,
          ),
          const SizedBox(height: 12),
          Text(
            title,
            style: const TextStyle(
              color: AppColors.navy,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            body,
            textAlign: TextAlign.center,
            style: TextStyle(color: AppColors.navy.withValues(alpha: 0.65)),
          ),
        ],
      ),
    );
  }
}
