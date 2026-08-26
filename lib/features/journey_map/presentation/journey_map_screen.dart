import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_theme.dart';
import '../../../shared/models/practice_session_record.dart';
import '../domain/journey_state.dart';

/// Child journey built from actual self-review sessions, not points or unlocks.
class JourneyMapScreen extends ConsumerWidget {
  const JourneyMapScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final summary = ref.watch(childPracticeSummaryProvider);
    return summary.when(
      loading: () => const Scaffold(
        backgroundColor: AppColors.ivory,
        body: Center(child: CircularProgressIndicator(color: AppColors.olive)),
      ),
      error: (_, __) => _JourneyScaffold(
        child: _PracticeNotice(
          title: 'تعذّر تحميل نشاطك',
          message: 'يمكنك مواصلة التدريب، وستظهر الجلسات عند توفر الاتصال.',
          actionLabel: 'ابدأ التدريب',
          onAction: () => context.push('/recitation'),
        ),
      ),
      data: (data) => _JourneyScaffold(
        child: _JourneyContent(
          summary: data,
          onStartPractice:
              data.hasActiveLearner ? () => context.push('/recitation') : null,
        ),
      ),
    );
  }
}

class _JourneyScaffold extends StatelessWidget {
  final Widget child;

  const _JourneyScaffold({required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.ivory,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: child,
        ),
      ),
    );
  }
}

class _JourneyContent extends StatelessWidget {
  final ChildPracticeSummary summary;
  final VoidCallback? onStartPractice;

  const _JourneyContent({
    required this.summary,
    required this.onStartPractice,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 20),
        const Text(
          'رحلتي في التلاوة',
          style: TextStyle(
            color: AppColors.navy,
            fontSize: 30,
            fontWeight: FontWeight.w700,
            fontFamily: 'Source Serif 4',
          ),
        ),
        const SizedBox(height: 6),
        Text(
          'كل جلسة هنا هي تدريب ومراجعة ذاتية، وليست حكمًا على الإتقان.',
          style: TextStyle(color: AppColors.navy.withValues(alpha: 0.65)),
        ),
        const SizedBox(height: 20),
        _PracticeTotals(summary: summary),
        const SizedBox(height: 24),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'جلساتك الأخيرة',
              style: TextStyle(
                color: AppColors.navy,
                fontSize: 20,
                fontWeight: FontWeight.w700,
              ),
            ),
            FilledButton.icon(
              onPressed: onStartPractice,
              style: FilledButton.styleFrom(
                backgroundColor: AppColors.olive,
                foregroundColor: Colors.white,
              ),
              icon: const Icon(Icons.mic_rounded, size: 18),
              label: const Text('تدرّب'),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Expanded(
          child: !summary.hasActiveLearner
              ? const _PracticeNotice(
                  title: 'اختر طفلًا أولًا',
                  message:
                      'من لوحة ولي الأمر، أضف ملف الطفل أو اختره قبل بدء جلسة تلاوة تُسجّل في رحلته.',
                  actionLabel: null,
                  onAction: null,
                )
              : summary.hasSessions
                  ? ListView.separated(
                      itemCount: summary.recentSessions.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 10),
                      itemBuilder: (context, index) => _SessionCard(
                        session: summary.recentSessions[index],
                        onTap: onStartPractice,
                      ),
                    )
                  : _PracticeNotice(
                      title: 'لم تُسجَّل جلسات بعد',
                      message:
                          'ابدأ بالاستماع والتكرار والتسجيل، ثم راجع تلاوتك بنفسك.',
                      actionLabel: 'ابدأ أول جلسة',
                      onAction: onStartPractice,
                    ),
        ),
      ],
    );
  }
}

class _PracticeTotals extends StatelessWidget {
  final ChildPracticeSummary summary;

  const _PracticeTotals({required this.summary});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: _MetricTile(
            icon: Icons.timer_outlined,
            value: '${summary.totalPracticeMinutes}',
            label: 'دقيقة تدريب',
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _MetricTile(
            icon: Icons.repeat_rounded,
            value: '${summary.totalAttempts}',
            label: 'محاولة مسجلة',
          ),
        ),
      ],
    );
  }
}

class _MetricTile extends StatelessWidget {
  final IconData icon;
  final String value;
  final String label;

  const _MetricTile({
    required this.icon,
    required this.value,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusLarge),
        boxShadow: [
          BoxShadow(
            color: AppColors.navy.withValues(alpha: 0.05),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppColors.olive),
          const SizedBox(height: 12),
          Text(
            value,
            style: const TextStyle(
              color: AppColors.navy,
              fontSize: 25,
              fontWeight: FontWeight.w700,
            ),
          ),
          Text(
            label,
            style: TextStyle(color: AppColors.navy.withValues(alpha: 0.6)),
          ),
        ],
      ),
    );
  }
}

class _SessionCard extends StatelessWidget {
  final PracticeSessionRecord session;
  final VoidCallback? onTap;

  const _SessionCard({required this.session, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final minutes = (session.durationSeconds / 60).ceil();
    return Semantics(
      button: true,
      label: 'تدرب على السورة ${session.surah}',
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Ink(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: AppColors.olive.withValues(alpha: 0.14)),
          ),
          child: Row(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: AppColors.olive.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(14),
                ),
                child:
                    const Icon(Icons.menu_book_rounded, color: AppColors.olive),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'سورة ${session.surah} · الآيات ${session.ayahStart}–${session.ayahEnd}',
                      style: const TextStyle(
                        color: AppColors.navy,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '$minutes دقيقة · ${session.attemptCount} محاولات · مراجعة ذاتية',
                      style: TextStyle(
                        color: AppColors.navy.withValues(alpha: 0.6),
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.chevron_left_rounded, color: AppColors.navy),
            ],
          ),
        ),
      ),
    );
  }
}

class _PracticeNotice extends StatelessWidget {
  final String title;
  final String message;
  final String? actionLabel;
  final VoidCallback? onAction;

  const _PracticeNotice({
    required this.title,
    required this.message,
    this.actionLabel,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
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
              Icons.headphones_rounded,
              color: AppColors.olive,
              size: 38,
            ),
            const SizedBox(height: 16),
            Text(
              title,
              style: const TextStyle(
                color: AppColors.navy,
                fontWeight: FontWeight.w700,
                fontSize: 18,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              message,
              textAlign: TextAlign.center,
              style: TextStyle(color: AppColors.navy.withValues(alpha: 0.65)),
            ),
            if (actionLabel != null && onAction != null) ...[
              const SizedBox(height: 18),
              FilledButton(onPressed: onAction, child: Text(actionLabel!)),
            ],
          ],
        ),
      ),
    );
  }
}
