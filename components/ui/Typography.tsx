import { Text, TextStyle, TextProps } from 'react-native';
import { colors, typography } from '../../lib/design-system';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'body' 
  | 'bodyLarge'
  | 'bodySmall' 
  | 'caption' 
  | 'overline';

type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export function Typography({
  variant = 'body',
  weight,
  color,
  align = 'left',
  style,
  children,
  ...props
}: TypographyProps) {
  
  const variantStyles: Record<TypographyVariant, TextStyle> = {
    h1: {
      fontSize: typography.fontSize['4xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
      color: colors.text.primary,
    },
    h2: {
      fontSize: typography.fontSize['3xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
      color: colors.text.primary,
    },
    h3: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
      color: colors.text.primary,
    },
    h4: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
      color: colors.text.primary,
    },
    bodyLarge: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.fontSize.lg * typography.lineHeight.relaxed,
      color: colors.text.primary,
    },
    body: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
      color: colors.text.primary,
    },
    bodySmall: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
      color: colors.text.secondary,
    },
    caption: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
      color: colors.text.tertiary,
    },
    overline: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.text.secondary,
    },
  };

  const textStyle: TextStyle = {
    ...variantStyles[variant],
    ...(weight && { fontWeight: typography.fontWeight[weight] }),
    ...(color && { color }),
    textAlign: align,
  };

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
}