import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:panstwa_miasta_design/panstwa_miasta_design.dart';

void main() {
  test('shared colors match the canonical palette', () {
    expect(PmColors.primary, const Color(0xFF1565C0));
    expect(PmColors.accent, const Color(0xFFFFC107));
    expect(PmColors.background, const Color(0xFFF8FAFC));
    expect(PmColors.textPrimary, const Color(0xFF0F172A));
  });

  test('light theme uses the shared primary color', () {
    final theme = PmTheme.lightTheme;

    expect(theme.useMaterial3, isTrue);
    expect(theme.colorScheme.primary, PmColors.primary);
    expect(theme.scaffoldBackgroundColor, PmColors.background);
  });
}
