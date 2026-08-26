/// Parsed response from the AI Tajweed engine.
///
/// Wire format: `{"score": 95.5, "mistakes": [{"word_index": 3, "error_type": "tajweed", "details": "missing_qalqalah"}]}`
class AiEvaluation {
  final double score;
  final List<AiMistake> mistakes;

  const AiEvaluation({required this.score, required this.mistakes});

  factory AiEvaluation.fromJson(Map<String, dynamic> json) {
    return AiEvaluation(
      score: (json['score'] as num?)?.toDouble() ?? 0.0,
      mistakes: (json['mistakes'] as List?)
              ?.map((m) => AiMistake.fromJson(m as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }

  /// Convert mistakes to the format stored in memorization_logs.mistakes JSONB.
  List<Map<String, dynamic>> toMistakesJson() {
    return mistakes
        .map((m) => {
              'word_index': m.wordIndex,
              'type': m.errorType,
              'details': m.details,
            })
        .toList();
  }

  bool get isSuccess => score >= 70.0;
}

class AiMistake {
  final int wordIndex;
  final String errorType;
  final String details;

  const AiMistake({
    required this.wordIndex,
    required this.errorType,
    required this.details,
  });

  factory AiMistake.fromJson(Map<String, dynamic> json) {
    return AiMistake(
      wordIndex: json['word_index'] as int? ?? 0,
      errorType: json['error_type'] as String? ?? 'unknown',
      details: json['details'] as String? ?? '',
    );
  }
}
