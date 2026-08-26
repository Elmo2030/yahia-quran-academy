import 'package:flutter/material.dart';

import '../../../../core/constants/app_constants.dart';
import '../../../../core/theme/app_theme.dart';

/// Reusable KPI card — Stitch reference: white card, 24px radius,
/// icon top-right, large metric value, subtitle/note below.
class KpiCard extends StatelessWidget {
  final String title;
  final String value;
  final String unit;
  final String? subtitle;
  final IconData icon;
  final Color? iconBgColor;
  final Widget? bottomWidget;

  const KpiCard({
    super.key,
    required this.title,
    required this.value,
    this.unit = '',
    this.subtitle,
    required this.icon,
    this.iconBgColor,
    this.bottomWidget,
  });

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
          // Title row + icon
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: AppColors.navy.withValues(alpha: 0.6),
                  ),
                ),
              ),
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: iconBgColor ??
                      AppColors.navy.withValues(alpha: 0.06),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: AppColors.navy, size: 20),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Large metric value
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                value,
                style: const TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.w700,
                  color: AppColors.olive,
                  height: 1.1,
                ),
              ),
              if (unit.isNotEmpty) ...[
                const SizedBox(width: 6),
                Text(
                  unit,
                  style: TextStyle(
                    fontSize: 16,
                    color: AppColors.navy.withValues(alpha: 0.5),
                  ),
                ),
              ],
            ],
          ),

          // Optional subtitle
          if (subtitle != null) ...[
            const SizedBox(height: 8),
            Text(
              subtitle!,
              style: TextStyle(
                fontSize: 13,
                color: AppColors.navy.withValues(alpha: 0.5),
              ),
            ),
          ],

          // Optional bottom widget (e.g., progress bar)
          if (bottomWidget != null) ...[
            const SizedBox(height: 12),
            bottomWidget!,
          ],
        ],
      ),
    );
  }
}
