export const colors = Object.freeze({
  primary: '#1565C0',
  accent: '#FFC107',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  border: '#CBD5E1',
  success: '#2E7D32',
  warning: '#FB8C00',
  error: '#D32F2F',
  rankingSilver: '#94A3B8',
  rankingBronze: '#CD7F32',
});

export const dimensions = Object.freeze({
  spacing: Object.freeze({
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    x2l: 24,
    x3l: 28,
    x4l: 32,
    x5l: 40,
    x6l: 48,
  }),
  radius: Object.freeze({
    small: 8,
    input: 14,
    standard: 16,
    pill: 24,
  }),
  border: Object.freeze({
    standard: 1,
    focus: 2,
  }),
  size: Object.freeze({
    touchTargetMin: 48,
    buttonStandard: 54,
    buttonLarge: 58,
    contentMax: 420,
    screenPadding: 24,
  }),
});

export const typography = Object.freeze({
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  fontWeight: Object.freeze({ regular: 400, semibold: 600, bold: 700 }),
});
