import 'dart:async';

import 'package:faras_quran_ai/core/theme/app_theme.dart';
import 'package:faras_quran_ai/features/auth/data/auth_repository.dart';
import 'package:faras_quran_ai/features/parent_dashboard/domain/dashboard_state.dart';
import 'package:faras_quran_ai/features/parent_dashboard/domain/parent_dashboard_controller.dart';
import 'package:faras_quran_ai/features/parent_dashboard/domain/parent_recording_feed.dart';
import 'package:faras_quran_ai/features/parent_dashboard/presentation/parent_dashboard_screen.dart';
import 'package:faras_quran_ai/features/recitation/data/recording_repository.dart';
import 'package:faras_quran_ai/shared/models/profile.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

class _MemoryParentReviewStore implements ParentReviewStore {
  ParentReview? added;

  @override
  Future<ParentReview> addReview({
    required StoredRecording recording,
    required String reviewerId,
    required ParentVerdict verdict,
    String? voiceNotePath,
  }) async {
    return added = ParentReview(
      id: 'review-1',
      recordingId: recording.id,
      profileId: recording.profileId,
      reviewerId: reviewerId,
      surah: recording.surah,
      ayah: recording.ayah,
      verdict: verdict,
      voiceNotePath: voiceNotePath,
      reviewedAt: DateTime.utc(2026, 8, 27),
    );
  }

  @override
  Future<ParentReview?> latestForRecording(String recordingId) async => added;
}

void main() {
  final parent = Profile(
    id: 'parent-1',
    role: UserRole.parent,
    displayName: 'ولي الأمر',
    createdAt: DateTime.utc(2026, 8, 27),
  );
  final child = Profile(
    id: 'child-1',
    role: UserRole.child,
    parentId: parent.id,
    displayName: 'يحيى',
    createdAt: DateTime.utc(2026, 8, 27),
  );
  final recording = StoredRecording(
    id: 'recording-1',
    profileId: child.id,
    surah: 1,
    ayah: 1,
    filePath: '/documents/yqa_recordings/recording-1.wav',
    durationMs: 2600,
    recordedAt: DateTime.utc(2026, 8, 27),
  );

  testWidgets('parent dashboard exposes local recording playback and verdict actions',
      (tester) async {
    final reviewStore = _MemoryParentReviewStore();
    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          currentProfileProvider.overrideWith((ref) => Stream.value(parent)),
          childProfilesProvider.overrideWith((ref) async => [child]),
          dashboardDataProvider.overrideWith(
            (ref) async => const DashboardState(
              totalMinutes: 0,
              minutesChangePercent: 0,
              sessionCount: 0,
              totalAttempts: 0,
              currentFocus: [],
              weeklyMinutes: [0, 0, 0, 0, 0, 0, 0],
              weekDays: [],
              recentPractice: [],
            ),
          ),
          parentRecordingFeedProvider.overrideWith(
            (ref) async => [
              ParentRecordingItem(
                child: child,
                recording: recording,
                latestReview: null,
              ),
            ],
          ),
          parentReviewStoreProvider.overrideWith((ref) => reviewStore),
        ],
        child: MaterialApp(
          theme: AppTheme.light,
          home: const Directionality(
            textDirection: TextDirection.rtl,
            child: ParentDashboardScreen(),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('تسجيلات الطفل للاستماع والمراجعة'), findsOneWidget);
    expect(find.text('يحيى · سورة 1 · آية 1'), findsOneWidget);
    expect(find.text('استمع'), findsOneWidget);
    expect(find.text('تمام'), findsOneWidget);
    expect(find.text('محتاج مراجعة'), findsOneWidget);
    expect(find.byTooltip('حذف التسجيل من هذا الجهاز'), findsOneWidget);

    final goodVerdict = find.text('تمام');
    await tester.ensureVisible(goodVerdict);
    await tester.pumpAndSettle();
    await tester.tap(goodVerdict);
    await tester.pumpAndSettle();
    expect(reviewStore.added?.recordingId, recording.id);
    expect(reviewStore.added?.reviewerId, parent.id);
    expect(reviewStore.added?.verdict, ParentVerdict.good);
    expect(reviewStore.added?.voiceNotePath, isNull);
  });
}
