import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_theme.dart';
import '../data/review_queue_repository.dart';
import '../domain/review_schedule.dart';

class ReviewQueueScreen extends ConsumerWidget {
  const ReviewQueueScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final queue = ref.watch(dueReviewItemsProvider);
    return Scaffold(
      backgroundColor: AppColors.ivory,
      appBar: AppBar(
        backgroundColor: AppColors.ivory,
        foregroundColor: AppColors.navy,
        title: const Text('مراجعة اليوم'),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: queue.when(
          loading: () => const Center(
            child: CircularProgressIndicator(color: AppColors.olive),
          ),
          error: (_, __) => const _ReviewNotice(
            title: 'تعذّرت قراءة القائمة',
            message:
                'يمكنك العودة لاحقًا وستظهر المراجعات عند توفر التخزين المحلي.',
          ),
          data: (items) => items.isEmpty
              ? const _ReviewNotice(
                  title: 'لا توجد مراجعات مستحقة اليوم',
                  message: 'أحسنت. ستظهر هنا الآيات عندما يحين موعد مراجعتها.',
                )
              : ListView.separated(
                  padding: const EdgeInsets.only(top: 20, bottom: 24),
                  itemCount: items.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final item = items[index];
                    return _ReviewCard(
                      item: item,
                      onStart: () {
                        ref.read(reviewTargetProvider.notifier).state =
                            ReviewTarget(
                          profileId: item.profileId,
                          surah: item.surah,
                          ayah: item.ayah,
                        );
                        context.push('/recitation');
                      },
                    );
                  },
                ),
        ),
      ),
    );
  }
}

class _ReviewCard extends StatelessWidget {
  final ReviewScheduleEntry item;
  final VoidCallback onStart;

  const _ReviewCard({required this.item, required this.onStart});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.olive.withValues(alpha: 0.16)),
      ),
      child: Row(
        children: [
          const Icon(Icons.replay_rounded, color: AppColors.olive, size: 30),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'سورة ${item.surah} · الآية ${item.ayah}',
                  style: const TextStyle(
                    color: AppColors.navy,
                    fontWeight: FontWeight.w700,
                    fontSize: 17,
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  'مراجعة رقم ${item.rung + 1}',
                  style:
                      TextStyle(color: AppColors.navy.withValues(alpha: 0.62)),
                ),
              ],
            ),
          ),
          FilledButton(
            onPressed: onStart,
            style: FilledButton.styleFrom(
              backgroundColor: AppColors.olive,
              foregroundColor: Colors.white,
            ),
            child: const Text('ابدأ'),
          ),
        ],
      ),
    );
  }
}

class _ReviewNotice extends StatelessWidget {
  final String title;
  final String message;

  const _ReviewNotice({required this.title, required this.message});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.auto_stories_rounded,
              color: AppColors.olive,
              size: 40,
            ),
            const SizedBox(height: 16),
            Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppColors.navy,
                fontWeight: FontWeight.w700,
                fontSize: 19,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              message,
              textAlign: TextAlign.center,
              style: TextStyle(color: AppColors.navy.withValues(alpha: 0.65)),
            ),
          ],
        ),
      ),
    );
  }
}
