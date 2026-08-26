import 'package:flutter/material.dart';

import '../../../../core/constants/app_constants.dart';
import '../../../../core/theme/app_theme.dart';

/// Yahya 3D mascot thumbnail — Stitch reference: bottom-right rounded
/// container with the cinematic render, soft shadow, 16px radius.
///
/// Points to the asset from stitch_designs cinematic render folder.
/// Falls back to a gold-tinted placeholder until the asset is bundled.
class YahyaMascot extends StatelessWidget {
  final String? assetPath;
  final double size;

  const YahyaMascot({
    super.key,
    this.assetPath = 'assets/images/yahya_3d.png',
    this.size = 72,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusSmall),
        boxShadow: [
          BoxShadow(
            color: AppColors.navy.withValues(alpha: 0.08),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Image.asset(
        assetPath!,
        fit: BoxFit.cover,
        errorBuilder: (_, __, ___) => Container(
          color: AppColors.gold.withValues(alpha: 0.12),
          child: const Center(
            child: Text('👦', style: TextStyle(fontSize: 32)),
          ),
        ),
      ),
    );
  }
}
