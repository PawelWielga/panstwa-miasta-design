import 'package:flutter/material.dart';

import 'colors.dart';
import 'dimensions.dart';

abstract final class PmTheme {
  static ThemeData get lightTheme {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: PmColors.primary,
      brightness: Brightness.light,
    ).copyWith(
      primary: PmColors.primary,
      onPrimary: PmColors.surface,
      secondary: PmColors.accent,
      onSecondary: PmColors.textPrimary,
      error: PmColors.error,
      onError: PmColors.surface,
      surface: PmColors.surface,
      onSurface: PmColors.textPrimary,
      outline: PmColors.border,
      surfaceContainerLowest: PmColors.surface,
      surfaceContainerLow: PmColors.background,
      surfaceContainer: PmColors.background,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: PmColors.background,
      splashFactory: NoSplash.splashFactory,
      splashColor: Colors.transparent,
      highlightColor: Colors.transparent,
      cardTheme: CardThemeData(
        color: PmColors.surface,
        surfaceTintColor: PmColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(PmRadius.standard),
          side: const BorderSide(color: PmColors.border),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: PmColors.surface,
        selectedColor: PmColors.primary,
        disabledColor: PmColors.background,
        labelStyle: const TextStyle(color: PmColors.textPrimary),
        secondaryLabelStyle: const TextStyle(color: PmColors.surface),
        side: const BorderSide(color: PmColors.border),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(PmRadius.pill),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: PmColors.background,
        foregroundColor: PmColors.textPrimary,
        surfaceTintColor: PmColors.background,
        elevation: 0,
        centerTitle: true,
      ),
      textTheme: const TextTheme(
        displaySmall: TextStyle(color: PmColors.textPrimary),
        headlineSmall: TextStyle(color: PmColors.textPrimary),
        titleLarge: TextStyle(color: PmColors.textPrimary),
        titleMedium: TextStyle(color: PmColors.textPrimary),
        titleSmall: TextStyle(color: PmColors.textPrimary),
        bodyLarge: TextStyle(color: PmColors.textSecondary),
        bodyMedium: TextStyle(color: PmColors.textPrimary),
        bodySmall: TextStyle(color: PmColors.textSecondary),
        labelLarge: TextStyle(color: PmColors.textPrimary),
        labelMedium: TextStyle(color: PmColors.textPrimary),
        labelSmall: TextStyle(color: PmColors.textSecondary),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: PmColors.primary,
          foregroundColor: PmColors.surface,
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(PmRadius.standard),
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: PmColors.primary,
          side: const BorderSide(color: PmColors.border),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(PmRadius.standard),
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: PmColors.surface,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PmRadius.input),
          borderSide: const BorderSide(color: PmColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PmRadius.input),
          borderSide: const BorderSide(color: PmColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(PmRadius.input),
          borderSide: const BorderSide(
            color: PmColors.primary,
            width: PmBorder.focus,
          ),
        ),
        labelStyle: const TextStyle(color: PmColors.textSecondary),
      ),
      dividerTheme: const DividerThemeData(color: PmColors.border),
      iconTheme: const IconThemeData(color: PmColors.textPrimary),
    );
  }
}
