import 'package:flutter/material.dart';
import '../constants/app_constants.dart';

abstract final class AppColors {
  static const ivory = Color(0xFFFCFAFA);
  static const olive = Color(0xFF556B2F);
  static const gold = Color(0xFFD4AF37);
  static const goldText = Color(0xFF8B7424); // WCAG AA on light backgrounds
  static const navy = Color(0xFF001F3F);
  static const softOrange = Color(0xFFE8913A);
  static const error = Color(0xFFBA1A1A); // DESIGN.md spec
}

abstract final class AppTheme {
  static final light = ThemeData(
    useMaterial3: true,
    fontFamily: 'Plus Jakarta Sans',
    scaffoldBackgroundColor: AppColors.ivory,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.olive,
      primary: AppColors.olive,
      secondary: AppColors.gold,
      error: AppColors.error,
      surface: AppColors.ivory,
      onSurface: AppColors.navy,
      brightness: Brightness.light,
    ),
    cardTheme: CardThemeData(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.cornerRadius),
      ),
      elevation: 0,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.olive,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.cornerRadiusSmall),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(AppConstants.cornerRadiusSmall),
        borderSide: BorderSide.none,
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.ivory,
      foregroundColor: AppColors.navy,
      elevation: 0,
      centerTitle: true,
    ),
  );
}
