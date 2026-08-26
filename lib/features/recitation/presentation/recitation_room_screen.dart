import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_theme.dart';
import '../domain/talaqqi_controller.dart';
import '../domain/talaqqi_state.dart';
import 'widgets/audio_visualizer.dart';
import 'widgets/mic_button.dart';
import 'widgets/yahya_mascot.dart';

/// Recitation Room — a child-led listen, repeat, record, and review practice loop.
class RecitationRoomScreen extends ConsumerWidget {
  const RecitationRoomScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(talaqqiProvider);
    final ctrl = ref.read(talaqqiProvider.notifier);

    return Scaffold(
      backgroundColor: AppColors.ivory,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            children: [
              const SizedBox(height: 8),
              const _TopBar(surahName: 'SURAH AL-FATIHA'),
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
                      if (state.phase == TalaqqiPhase.selfReview)
                        Padding(
                          padding: const EdgeInsets.only(top: 20),
                          child: _SelfReviewCard(
                            state: state,
                            onReplayChild: ctrl.replayChildRecording,
                            onReplaySheikh: ctrl.replaySheikhAyah,
                            onRetry: ctrl.retryCurrentAyah,
                            onNext: ctrl.nextAyah,
                          ),
                        ),
                      if (state.phase == TalaqqiPhase.error)
                        Padding(
                          padding: const EdgeInsets.only(top: 20),
                          child: _PracticeNotice(message: state.mascotMessage),
                        ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              _BottomControls(
                state: state,
                onMicTap: () {
                  if (!state.isActive &&
                      state.phase != TalaqqiPhase.selfReview) {
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

class _TopBar extends StatelessWidget {
  final String surahName;

  const _TopBar({required this.surahName});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
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
              letterSpacing: 0.6,
              color: AppColors.navy,
            ),
          ),
        ),
        const SizedBox(width: 40),
      ],
    );
  }
}

class _AyahCard extends StatelessWidget {
  final int ayahNumber;
  final int totalAyahs;
  final List<String> ayahTexts;

  const _AyahCard({
    required this.ayahNumber,
    required this.totalAyahs,
    this.ayahTexts = const [],
  });

  static const _translations = [
    'In the name of Allah, the Entirely Merciful, the Especially Merciful',
    '[All] praise is [due] to Allah, Lord of the worlds',
    'The Entirely Merciful, the Especially Merciful',
    'Sovereign of the Day of Recompense',
    'It is You we worship and You we ask for help',
    'Guide us to the straight path',
    'The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray',
  ];

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
                letterSpacing: 0.6,
                color: AppColors.olive,
              ),
            ),
          ),
          const SizedBox(height: 16),
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

class _NextAyahPreview extends StatelessWidget {
  final int nextAyahIndex;
  final List<String> ayahTexts;

  const _NextAyahPreview({
    required this.nextAyahIndex,
    this.ayahTexts = const [],
  });

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

class _SelfReviewCard extends StatelessWidget {
  final TalaqqiState state;
  final Future<void> Function() onReplayChild;
  final Future<void> Function() onReplaySheikh;
  final Future<void> Function() onRetry;
  final Future<void> Function() onNext;

  const _SelfReviewCard({
    required this.state,
    required this.onReplayChild,
    required this.onReplaySheikh,
    required this.onRetry,
    required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    final hasNext = state.currentAyah < state.totalAyahs;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.olive.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.olive.withValues(alpha: 0.18)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.headphones_rounded, color: AppColors.olive),
              const SizedBox(width: 8),
              const Expanded(
                child: Text(
                  'Review your recitation',
                  style: TextStyle(
                    color: AppColors.navy,
                    fontSize: 17,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              Text(
                'Attempt ${state.attemptCount}',
                style: TextStyle(
                  color: AppColors.navy.withValues(alpha: 0.5),
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Listen to your recording and the Sheikh. This practice does not make an automatic mastery decision.',
            style: TextStyle(
              color: AppColors.navy.withValues(alpha: 0.68),
              height: 1.45,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              OutlinedButton.icon(
                onPressed: onReplayChild,
                icon: const Icon(Icons.play_circle_outline_rounded),
                label: const Text('My recording'),
              ),
              OutlinedButton.icon(
                onPressed: onReplaySheikh,
                icon: const Icon(Icons.volume_up_outlined),
                label: const Text('Sheikh again'),
              ),
            ],
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: onRetry,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.olive,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
              icon: const Icon(Icons.refresh_rounded),
              label: const Text('Practice this ayah again'),
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: TextButton(
              onPressed: onNext,
              child: Text(
                hasNext
                    ? 'Continue to the next ayah'
                    : 'Finish this practice session',
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _PracticeNotice extends StatelessWidget {
  final String message;

  const _PracticeNotice({required this.message});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.softOrange.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Text(
        message,
        textAlign: TextAlign.center,
        style: const TextStyle(color: AppColors.navy, height: 1.4),
      ),
    );
  }
}

class _BottomControls extends StatelessWidget {
  final TalaqqiState state;
  final VoidCallback onMicTap;

  const _BottomControls({required this.state, required this.onMicTap});

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.bottomCenter,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: MicButton(phase: state.phase, onTap: onMicTap),
        ),
        const Positioned(right: 0, bottom: 0, child: YahyaMascot(size: 64)),
      ],
    );
  }
}
