export declare const colors: Readonly<{
  primary: '#1565C0';
  accent: '#FFC107';
  background: '#F8FAFC';
  surface: '#FFFFFF';
  textPrimary: '#0F172A';
  textSecondary: '#64748B';
  border: '#CBD5E1';
  success: '#2E7D32';
  warning: '#FB8C00';
  error: '#D32F2F';
  rankingSilver: '#94A3B8';
  rankingBronze: '#CD7F32';
}>;

export declare const dimensions: Readonly<{
  spacing: Readonly<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'x2l' | 'x3l' | 'x4l' | 'x5l' | 'x6l', number>>;
  radius: Readonly<Record<'small' | 'input' | 'standard' | 'pill', number>>;
  border: Readonly<Record<'standard' | 'focus', number>>;
  size: Readonly<Record<'touchTargetMin' | 'buttonStandard' | 'buttonLarge' | 'contentMax' | 'screenPadding', number>>;
}>;

export declare const typography: Readonly<{
  fontFamily: string;
  fontWeight: Readonly<{
    regular: 400;
    semibold: 600;
    bold: 700;
  }>;
}>;
