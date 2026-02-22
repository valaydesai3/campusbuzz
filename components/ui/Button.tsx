// components/ui/Button.tsx
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../../lib/design-system';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string; // emoji for now
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  
  // Variant styles
  const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    primary: {
      container: {
        backgroundColor: colors.primary[500],
        ...shadows.md,
      },
      text: {
        color: colors.text.inverse,
      },
    },
    secondary: {
      container: {
        backgroundColor: colors.secondary[500],
        ...shadows.md,
      },
      text: {
        color: colors.text.inverse,
      },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary[500],
      },
      text: {
        color: colors.primary[500],
      },
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: colors.primary[500],
      },
    },
    danger: {
      container: {
        backgroundColor: colors.error,
        ...shadows.md,
      },
      text: {
        color: colors.text.inverse,
      },
    },
  };

  // Size styles
  const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
      },
      text: {
        fontSize: typography.fontSize.sm,
      },
    },
    md: {
      container: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
      },
      text: {
        fontSize: typography.fontSize.base,
      },
    },
    lg: {
      container: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.xl,
      },
      text: {
        fontSize: typography.fontSize.lg,
      },
    },
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...sizeStyles[size].container,
    ...variantStyles[variant].container,
    ...(fullWidth && { width: '100%' }),
    ...(disabled && { opacity: 0.5 }),
  };

  const textStyle: TextStyle = {
    fontWeight: typography.fontWeight.semibold,
    ...sizeStyles[size].text,
    ...variantStyles[variant].text,
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? colors.primary[500] : colors.text.inverse}
          size="small"
        />
      ) : (
        <>
          {icon && <Text style={{ fontSize: sizeStyles[size].text.fontSize, marginRight: spacing.xs }}>{icon}</Text>}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}