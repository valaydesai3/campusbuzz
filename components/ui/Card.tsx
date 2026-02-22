import { View, ViewStyle, Pressable } from 'react-native';
import { ReactNode } from 'react';
import { colors, spacing, borderRadius, shadows } from '../../lib/design-system';

type CardVariant = 'elevated' | 'outlined' | 'filled';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  padding?: keyof typeof spacing;
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'elevated',
  onPress,
  padding = 'lg',
  style,
}: CardProps) {
  
  const variantStyles: Record<CardVariant, ViewStyle> = {
    elevated: {
      backgroundColor: colors.background.primary,
      ...shadows.md,
    },
    outlined: {
      backgroundColor: colors.background.primary,
      borderWidth: 1,
      borderColor: colors.neutral[200],
    },
    filled: {
      backgroundColor: colors.background.secondary,
    },
  };

  const containerStyle: ViewStyle = {
    borderRadius: borderRadius.lg,
    padding: spacing[padding],
    ...variantStyles[variant],
    ...style,
  };

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          containerStyle,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        ]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

// Sub-components for better composition
export function CardHeader({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{ marginBottom: spacing.md }, style]}>
      {children}
    </View>
  );
}

export function CardContent({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{ marginBottom: spacing.md }, style]}>
      {children}
    </View>
  );
}

export function CardFooter({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{ flexDirection: 'row', gap: spacing.sm, alignItems: 'center' }, style]}>
      {children}
    </View>
  );
}