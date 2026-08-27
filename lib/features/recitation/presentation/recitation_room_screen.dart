import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_theme.dart';
import '../data/audio_asset_repository.dart';
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
    final recitations = ref.watch(recitationDescriptorsProvider);

    return Scaffold(
      backgroundColor: AppColors.ivory,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            children: [
              const SizedBox(height: 8),
              _TopBar(surahName: 'سورة ${state.surah}'),
              const SizedBox(height: 12),
              recitations.when(
                loading: () => const SizedBox(
                  height: 52,
                  child: Center(
                    child: CircularProgressIndicator(color: AppColors.olive),
                  ),
                ),
                error: (_, __) => const _PracticeNotice(
                  message: 'تعذّر تحميل خيارات المصحف. حاول مرة أخرى.',
                ),
                data: (items) => _RecitationPicker(
                  selected: state.recitationId,
                  options: items,
                  onChanged: ctrl.selectRecitation,
                ),
              ),
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
                      if (state.isContentLoading)
                        const _ContentLoading()
                      else if (!state.hasTextContent)
                        _PracticeNotice(
                          message: state.contentError.isEmpty
                              ? 'تعذّر تحميل محتوى السورة. حاول لاحقًا.'
                              : state.contentError,
                        )
                      else ...[
                        _AyahCard(
                          ayahNumber: state.currentAyah,
                          totalAyahs: state.totalAyahs,
                          ayahTexts: state.ayahTexts,
                          activeAyah: state.activeTimedAyah,
                          activeWord: state.activeTimedWord,
                        ),
                        const SizedBox(height: 24),
                        if (state.currentAyah < state.totalAyahs)
                          _NextAyahPreview(
                            nextAyahIndex: state.currentAyah,
                            ayahTexts: state.ayahTexts,
                          ),
                        const SizedBox(height: 24),
                        _AudioAvailabilityCard(
                          state: state,
                          onPlayWholeSurah: ctrl.playWholeSurah,
                          onPauseWholeSurah: ctrl.pauseWholeSurah,
                        ),
                        const SizedBox(height: 24),
                        AudioVisualizer(
                          phase: state.phase,
                          progress: state.phaseProgress,
                        ),
                      ],
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

class _RecitationPicker extends StatelessWidget {
  final RecitationId selected;
  final List<RecitationDescriptor> options;
  final ValueChanged<RecitationId> onChanged;

  const _RecitationPicker({
    required this.selected,
    required this.options,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'اختر المصحف',
      child: DropdownButtonFormField<RecitationId>(
        value: selected,
        isExpanded: true,
        decoration: InputDecoration(
          labelText: 'اختر المصحف',
          prefixIcon: const Icon(Icons.menu_book_rounded),
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide:
                BorderSide(color: AppColors.olive.withValues(alpha: 0.2)),
          ),
        ),
        items: options
            .map(
              (option) => DropdownMenuItem<RecitationId>(
                value: option.id,
                child: Text(option.displayNameAr),
              ),
            )
            .toList(),
        onChanged: (value) {
          if (value != null) onChanged(value);
        },
      ),
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
  final int? activeAyah;
  final int? activeWord;

  const _AyahCard({
    required this.ayahNumber,
    required this.totalAyahs,
    this.ayahTexts = const [],
    this.activeAyah,
    this.activeWord,
  });

  @override
  Widget build(BuildContext context) {
    final idx = (ayahNumber - 1).clamp(0, ayahTexts.length - 1);
    final ar = ayahTexts[idx];
    final isActive = activeAyah == ayahNumber;
    final words = ar.trim().split(RegExp(r'\s+'));

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      decoration: BoxDecoration(
        color: isActive ? AppColors.gold.withValues(alpha: 0.12) : Colors.white,
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusLarge),
        border: isActive
            ? Border.all(
                color: AppColors.gold.withValues(alpha: 0.8),
                width: 1.5,
              )
            : null,
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
          if (isActive && activeWord != null)
            Wrap(
              alignment: WrapAlignment.center,
              textDirection: TextDirection.rtl,
              spacing: 4,
              runSpacing: 6,
              children: List.generate(words.length, (index) {
                final wordIsActive = index + 1 == activeWord;
                return Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 3, vertical: 1),
                  decoration: wordIsActive
                      ? BoxDecoration(
                          color: AppColors.gold.withValues(alpha: 0.55),
                          borderRadius: BorderRadius.circular(6),
                        )
                      : null,
                  child: Text(
                    words[index],
                    textDirection: TextDirection.rtl,
                    style: const TextStyle(
                      fontSize: 32,
                      height: 1.8,
                      fontFamily: 'Noto Naskh Arabic',
                      color: AppColors.navy,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                );
              }),
            )
          else
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
              'الآية $ayahNumber من $totalAyahs',
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.6,
                color: AppColors.olive,
              ),
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
    final text = ayahTexts[nextAyahIndex.clamp(0, ayahTexts.length - 1)];

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

class _ContentLoading extends StatelessWidget {
  const _ContentLoading();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(vertical: 56),
      child: Column(
        children: [
          CircularProgressIndicator(color: AppColors.olive),
          SizedBox(height: 16),
          Text(
            'يُحمّل نص السورة وبيانات الاستماع…',
            style: TextStyle(color: AppColors.navy),
          ),
        ],
      ),
    );
  }
}

class _AudioAvailabilityCard extends StatelessWidget {
  final TalaqqiState state;
  final Future<void> Function() onPlayWholeSurah;
  final Future<void> Function() onPauseWholeSurah;

  const _AudioAvailabilityCard({
    required this.state,
    required this.onPlayWholeSurah,
    required this.onPauseWholeSurah,
  });

  @override
  Widget build(BuildContext context) {
    final hasWholeSurah = state.canPlayWholeSurah;
    final isTimedTeacher =
        state.recitationId == RecitationId.husaryMuallimTimed;
    final message = hasWholeSurah && isTimedTeacher
        ? 'تلاوة الحُصَري المعلّم متزامنة مع هذه السورة. يضيء النص فقط أثناء تشغيل التسجيل المطابق.'
        : hasWholeSurah
            ? 'هذا مصحف للتعلّم مع الأطفال. لا تتوفر له توقيتات مطابقة ومراجعة، لذلك لا يظهر تمييز زمني.'
            : 'نص السورة متاح. التسجيل مدرج في المكتبة، لكنه غير جاهز للتشغيل أو التقسيم إلى آيات بعد.';

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.softOrange.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.softOrange.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.headphones_outlined, color: AppColors.navy),
              SizedBox(width: 8),
              Text(
                'حالة الاستماع',
                style: TextStyle(
                  color: AppColors.navy,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            message,
            style: TextStyle(color: AppColors.navy.withValues(alpha: 0.75)),
          ),
          if (hasWholeSurah) ...[
            const SizedBox(height: 12),
            OutlinedButton.icon(
              onPressed: state.isWholeSurahPlaying
                  ? onPauseWholeSurah
                  : onPlayWholeSurah,
              icon: Icon(
                state.isWholeSurahPlaying
                    ? Icons.pause_rounded
                    : Icons.play_arrow_rounded,
              ),
              label: Text(
                state.isWholeSurahPlaying
                    ? 'إيقاف التلاوة'
                    : 'استمع إلى السورة كاملة',
              ),
            ),
          ],
        ],
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
