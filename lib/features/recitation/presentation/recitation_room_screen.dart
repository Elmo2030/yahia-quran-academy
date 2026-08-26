import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_theme.dart';
import '../domain/talaqqi_controller.dart';
import '../domain/talaqqi_state.dart';
import '../usage_tracker_service.dart';
import '../widgets/limit_reached_dialog.dart';
import 'widgets/audio_visualizer.dart';
import 'widgets/mic_button.dart';
import 'widgets/yahya_mascot.dart';

/// Recitation Room — the core Talaqqi loop screen.
///
/// Layout matches Stitch reference (recitation_room/screen.png):
///   ┌─────────────────────────────┐
///   │  ←    SURAH AL-FATIHA       │  ← top bar
///   │                             │
///   │   الْحَمْدُ لِلَّهِ رَبِّ  │  ← large Arabic ayah
///   │      الْعَالَمِينَ          │
///   │       [ AYAH 2 ]            │  ← olive chip
///   │   "English translation"     │  ← translation text
///   │                             │
///   │  الرَّحْمَٰنِ الرَّحِيمِ   │  ← faded next-ayah preview
///   │                             │
///   │      ▐ ▌ ▐ ▌▐ ▌ ▐ ▌ ▐      │  ← visualizer
///   │                             │
///   │         ( 🎤 )              │  ← mic button
///   │       LISTENING...     [👦] │  ← label + Yahya render
///   └─────────────────────────────┘
class RecitationRoomScreen extends ConsumerStatefulWidget {
  const RecitationRoomScreen({super.key});

  @override
  ConsumerState<RecitationRoomScreen> createState() =>
      _RecitationRoomScreenState();
}

class _RecitationRoomScreenState extends ConsumerState<RecitationRoomScreen> {
  @override
  Widget build(BuildContext context) {
    final state = ref.watch(talaqqiProvider);
    final ctrl = ref.read(talaqqiProvider.notifier);
    final canUse = ref.watch(canUseAIProvider).valueOrNull ?? true;

    // Show limit dialog if controller flagged it
    if (ctrl.dailyLimitReached) {
      ctrl.dailyLimitReached = false;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) LimitReachedDialog.show(context);
      });
    }

    return Scaffold(
      backgroundColor: AppColors.ivory,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            children: [
              const SizedBox(height: 8),
              _TopBar(surahName: 'SURAH AL-FATIHA'),
              const SizedBox(height: 12),
              _AyahProgressBar(
                current: state.currentAyah,
                total: state.totalAyahs,
              ),
              const SizedBox(height: 24),
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      _AyahCard(
                        ayahNumber: state.currentAyah,
                        totalAyahs: state.totalAyahs,
                        ayahTexts: state.ayahTexts,
                      ),
                      const SizedBox(height: 24),
                      if (state.currentAyah < state.totalAyahs)
                        _NextAyahPreview(
                          nextAyahIndex: state.currentAyah,
                          ayahTexts: state.ayahTexts,
                        ),
                      const SizedBox(height: 32),
                      AudioVisualizer(
                        phase: state.phase,
                        progress: state.phaseProgress,
                      ),
                      if (state.phase == TalaqqiPhase.success && state.lastScore != null)
                        Padding(
                          padding: const EdgeInsets.only(top: 20),
                          child: _ScoreFeedback(score: state.lastScore!),
                        ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              _BottomControls(
                state: state,
                micDisabled: !canUse,
                onMicTap: () {
                  if (!canUse) {
                    LimitReachedDialog.show(context);
                    return;
                  }
                  if (state.phase == TalaqqiPhase.success) {
                    ctrl.nextAyah();
                  } else if (!state.isActive) {
                    ctrl.startTalaqqiSession();
                  }
                },
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────
// Ayah progress — step dots showing position in surah
// ─────────────────────────────────────────────

class _AyahProgressBar extends StatelessWidget {
  final int current;
  final int total;

  const _AyahProgressBar({required this.current, required this.total});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(total, (i) {
        final isDone = i < current - 1;
        final isCurrent = i == current - 1;
        return AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          margin: const EdgeInsets.symmetric(horizontal: 3),
          width: isCurrent ? 24 : 8,
          height: 8,
          decoration: BoxDecoration(
            color: isDone
                ? AppColors.olive
                : isCurrent
                    ? AppColors.gold
                    : AppColors.navy.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(4),
          ),
        );
      }),
    );
  }
}

// ─────────────────────────────────────────────
// Top bar — Stitch: back arrow + centered caps label
// ─────────────────────────────────────────────

class _TopBar extends StatelessWidget {
  final String surahName;

  const _TopBar({required this.surahName});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // Back button — 24px radius per spec
        GestureDetector(
          onTap: () => context.pop(),
          child: Semantics(
            label: 'Go back',
            button: true,
            child: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.navy.withValues(alpha: 0.06),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: const Icon(
                Icons.arrow_back_ios_new_rounded,
                size: 16,
                color: AppColors.navy,
              ),
            ),
          ),
        ),
        Expanded(
          child: Text(
            surahName,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.05 * 12,
              color: AppColors.navy,
            ),
          ),
        ),
        // Balance spacer for centering
        const SizedBox(width: 40),
      ],
    );
  }
}

// ─────────────────────────────────────────────
// Ayah card — large Arabic + chip + translation
// ─────────────────────────────────────────────

class _AyahCard extends StatelessWidget {
  final int ayahNumber;
  final int totalAyahs;
  final List<String> ayahTexts;

  const _AyahCard({
    required this.ayahNumber,
    required this.totalAyahs,
    this.ayahTexts = const [],
  });

  // Fallback translations for Al-Fatihah
  static const _translations = [
    'In the name of Allah, the Entirely Merciful, the Especially Merciful',
    '[All] praise is [due] to Allah, Lord of the worlds',
    'The Entirely Merciful, the Especially Merciful',
    'Sovereign of the Day of Recompense',
    'It is You we worship and You we ask for help',
    'Guide us to the straight path',
    'The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray',
  ];

  // Fallback Arabic for when metadata hasn't loaded yet
  static const _fallbackArabic = [
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    'الرَّحْمَٰنِ الرَّحِيمِ',
    'مَالِكِ يَوْمِ الدِّينِ',
    'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
  ];

  @override
  Widget build(BuildContext context) {
    final idx = (ayahNumber - 1).clamp(0, 6);
    final arabicList = ayahTexts.isNotEmpty ? ayahTexts : _fallbackArabic;
    final ar = arabicList[idx.clamp(0, arabicList.length - 1)];
    final en = idx < _translations.length ? '"${_translations[idx]}"' : '';

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusLarge),
        boxShadow: [
          BoxShadow(
            color: AppColors.navy.withValues(alpha: 0.05),
            blurRadius: 24,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        children: [
          // Arabic ayah — large, centered, Naskh
          Text(
            ar,
            textAlign: TextAlign.center,
            textDirection: TextDirection.rtl,
            style: const TextStyle(
              fontSize: 32,
              height: 1.8,
              fontFamily: 'Noto Naskh Arabic',
              color: AppColors.navy,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),

          // Ayah number chip — olive green pill
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.olive.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(100),
            ),
            child: Text(
              'AYAH $ayahNumber',
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.05 * 12,
                color: AppColors.olive,
              ),
            ),
          ),
          const SizedBox(height: 16),

          // English translation
          Text(
            en,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              height: 1.5,
              color: AppColors.navy.withValues(alpha: 0.7),
            ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────
// Next ayah preview — faded olive text
// ─────────────────────────────────────────────

class _NextAyahPreview extends StatelessWidget {
  final int nextAyahIndex;
  final List<String> ayahTexts;

  const _NextAyahPreview({required this.nextAyahIndex, this.ayahTexts = const []});

  @override
  Widget build(BuildContext context) {
    final list = ayahTexts.isNotEmpty ? ayahTexts : _AyahCard._fallbackArabic;
    final text = list[nextAyahIndex.clamp(0, list.length - 1)];

    return Text(
      text,
      textAlign: TextAlign.center,
      textDirection: TextDirection.rtl,
      style: TextStyle(
        fontSize: 22,
        height: 1.6,
        fontFamily: 'Noto Naskh Arabic',
        color: AppColors.olive.withValues(alpha: 0.35),
      ),
    );
  }
}

// ─────────────────────────────────────────────
// Score feedback — shown after successful evaluation
// ─────────────────────────────────────────────

class _ScoreFeedback extends StatelessWidget {
  final double score;

  const _ScoreFeedback({required this.score});

  @override
  Widget build(BuildContext context) {
    final isExcellent = score >= 90;
    final isGood = score >= 80;
    final label = isExcellent ? 'Excellent!' : isGood ? 'Great Job!' : 'Keep Practicing';
    final color = isExcellent ? AppColors.gold : isGood ? AppColors.olive : AppColors.softOrange;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                '${score.toInt()}',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          const SizedBox(width: 14),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: color,
                ),
              ),
              Text(
                'Tajweed Accuracy: ${score.toStringAsFixed(0)}%',
                style: TextStyle(
                  fontSize: 13,
                  color: AppColors.navy.withValues(alpha: 0.5),
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
// Bottom controls — mic button centered, Yahya bottom-right
// ─────────────────────────────────────────────

class _BottomControls extends StatelessWidget {
  final TalaqqiState state;
  final bool micDisabled;
  final VoidCallback onMicTap;

  const _BottomControls({
    required this.state,
    this.micDisabled = false,
    required this.onMicTap,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.bottomCenter,
      children: [
        // Mic button — centered
        Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: MicButton(phase: state.phase, onTap: onMicTap),
        ),

        // Yahya — bottom right, per Stitch layout
        Positioned(
          right: 0,
          bottom: 0,
          child: YahyaMascot(size: 64),
        ),
      ],
    );
  }
}
