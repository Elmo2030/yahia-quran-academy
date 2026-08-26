import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

import '../../../../core/constants/app_constants.dart';
import '../../../../core/theme/app_theme.dart';

/// Weekly engagement area chart — Stitch reference: dark navy card,
/// filled area chart with two series (minutes + goals), Mon–Fri labels.
class WeeklyChart extends StatelessWidget {
  final List<double> minutes;
  final List<double> goals;
  final List<String> days;

  const WeeklyChart({
    super.key,
    required this.minutes,
    required this.goals,
    required this.days,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.navy,
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusLarge),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header: title + legend
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Weekly\nEngagement',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                  height: 1.2,
                ),
              ),
              Row(
                children: [
                  _LegendDot(color: AppColors.olive, label: 'Minutes'),
                  const SizedBox(width: 12),
                  _LegendDot(color: AppColors.gold, label: 'Goals'),
                ],
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Chart
          SizedBox(
            height: 160,
            child: LineChart(
              LineChartData(
                gridData: const FlGridData(show: false),
                borderData: FlBorderData(show: false),
                titlesData: FlTitlesData(
                  topTitles: const AxisTitles(
                    sideTitles: SideTitles(showTitles: false),
                  ),
                  rightTitles: const AxisTitles(
                    sideTitles: SideTitles(showTitles: false),
                  ),
                  leftTitles: const AxisTitles(
                    sideTitles: SideTitles(showTitles: false),
                  ),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      interval: 1,
                      getTitlesWidget: (value, _) {
                        final i = value.toInt();
                        if (i < 0 || i >= days.length) {
                          return const SizedBox.shrink();
                        }
                        return Padding(
                          padding: const EdgeInsets.only(top: 8),
                          child: Text(
                            days[i],
                            style: TextStyle(
                              color: Colors.white.withValues(alpha: 0.5),
                              fontSize: 12,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
                minY: 0,
                maxY: _maxY,
                lineBarsData: [
                  // Minutes — olive filled area
                  _buildLine(
                    minutes,
                    AppColors.olive,
                    AppColors.olive.withValues(alpha: 0.3),
                  ),
                  // Goals — gold dashed line
                  _buildLine(
                    goals,
                    AppColors.gold,
                    AppColors.gold.withValues(alpha: 0.1),
                    isDashed: true,
                  ),
                ],
                lineTouchData: const LineTouchData(enabled: false),
              ),
            ),
          ),
        ],
      ),
    );
  }

  double get _maxY {
    final allValues = [...minutes, ...goals];
    final max = allValues.reduce((a, b) => a > b ? a : b);
    return (max * 1.3).ceilToDouble();
  }

  LineChartBarData _buildLine(
    List<double> data,
    Color color,
    Color fillColor, {
    bool isDashed = false,
  }) {
    return LineChartBarData(
      spots: List.generate(
        data.length,
        (i) => FlSpot(i.toDouble(), data[i]),
      ),
      isCurved: true,
      curveSmoothness: 0.3,
      color: color,
      barWidth: 2.5,
      isStrokeCapRound: true,
      dashArray: isDashed ? [6, 4] : null,
      dotData: const FlDotData(show: false),
      belowBarData: BarAreaData(
        show: true,
        color: fillColor,
      ),
    );
  }
}

class _LegendDot extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendDot({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withValues(alpha: 0.7),
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}
