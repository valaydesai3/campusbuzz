import { 
  TextInput, 
  View, 
  Text, 
  TextInputProps, 
  ViewStyle,
  TextStyle 
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/design-system';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string; // emoji for now
  rightIcon?: string;
  variant?: 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'outline',
  size = 'md',
  style,
  ...props
}: InputProps) {
  
  const sizeStyles: Record<string, { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        minHeight: 40,
      },
      text: {
        fontSize: typography.fontSize.sm,
      },
    },
    md: {
      container: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        minHeight: 48,
      },
      text: {
        fontSize: typography.fontSize.base,
      },
    },
    lg: {
      container: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        minHeight: 56,
      },
      text: {
        fontSize: typography.fontSize.lg,
      },
    },
  };

  const variantStyles: Record<string, ViewStyle> = {
    outline: {
      backgroundColor: colors.background.primary,
      borderWidth: 2,
      borderColor: error ? colors.error : colors.neutral[300],
    },
    filled: {
      backgroundColor: colors.background.secondary,
      borderWidth: 0,
    },
  };

  const containerStyle: ViewStyle = {
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...sizeStyles[size].container,
    ...variantStyles[variant],
    ...(props.editable === false && { opacity: 0.5 }),
  };

  return (
    <View>
      {/* Label */}
      {label && (
        <Text style={{
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: colors.text.primary,
          marginBottom: spacing.xs,
        }}>
          {label}
        </Text>
      )}

      {/* Input Container */}
      <View style={containerStyle}>
        {/* Left Icon */}
        {leftIcon && (
          <Text style={{ 
            fontSize: sizeStyles[size].text.fontSize, 
            marginRight: spacing.sm 
          }}>
            {leftIcon}
          </Text>
        )}

        {/* Input Field */}
        <TextInput
          style={[
            {
              flex: 1,
              color: colors.text.primary,
              ...sizeStyles[size].text,
            },
            style,
          ]}
          placeholderTextColor={colors.text.tertiary}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <Text style={{ 
            fontSize: sizeStyles[size].text.fontSize, 
            marginLeft: spacing.sm 
          }}>
            {rightIcon}
          </Text>
        )}
      </View>

      {/* Helper Text or Error */}
      {(error || helperText) && (
        <Text style={{
          fontSize: typography.fontSize.xs,
          color: error ? colors.error : colors.text.secondary,
          marginTop: spacing.xs,
          marginLeft: spacing.sm,
        }}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
}

// Textarea variant for multiline input
export function TextArea(props: InputProps) {
  return (
    <Input
      {...props}
      multiline
      textAlignVertical="top"
      style={[
        { minHeight: 100 },
        props.style,
      ]}
    />
  );
}