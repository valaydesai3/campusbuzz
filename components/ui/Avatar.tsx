import { View, Text, Image, ViewStyle } from 'react-native';
import { colors, typography } from '../../lib/design-system';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  imageUrl?: string | null;
  name?: string;
  size?: AvatarSize;
  showBadge?: boolean;
  badgeColor?: string;
}

export function Avatar({
  imageUrl,
  name,
  size = 'md',
  showBadge = false,
  badgeColor = colors.success,
}: AvatarProps) {
  
  const sizeMap: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const fontSizeMap: Record<AvatarSize, number> = {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
  };

  const avatarSize = sizeMap[size];
  const fontSize = fontSizeMap[size];
  const badgeSize = avatarSize * 0.25;

  // Get initials from name
  const getInitials = (name?: string): string => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate color from name
  const getColorFromName = (name?: string): string => {
    if (!name) return colors.neutral[400];
    const colors_array = [
      colors.primary[400],
      colors.primary[500],
      colors.secondary[400],
      colors.secondary[500],
      '#f59e0b', // orange
      '#10b981', // green
      '#3b82f6', // blue
      '#ec4899', // pink
    ];
    const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    return colors_array[charCode % colors_array.length];
  };

  const containerStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: getColorFromName(name),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  };

  return (
    <View style={containerStyle}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            color: colors.text.inverse,
            fontSize: fontSize,
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          {getInitials(name)}
        </Text>
      )}

      {/* Online Badge */}
      {showBadge && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
            backgroundColor: badgeColor,
            borderWidth: 2,
            borderColor: colors.background.primary,
          }}
        />
      )}
    </View>
  );
}

// Avatar Group - for showing multiple avatars
interface AvatarGroupProps {
  avatars: Array<{ imageUrl?: string | null; name?: string }>;
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ avatars, max = 3, size = 'md' }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const sizeMap: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const avatarSize = sizeMap[size];
  const overlap = avatarSize * 0.25;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {displayAvatars.map((avatar, index) => (
        <View
          key={index}
          style={{
            marginLeft: index > 0 ? -overlap : 0,
            zIndex: displayAvatars.length - index,
            borderWidth: 2,
            borderColor: colors.background.primary,
            borderRadius: avatarSize / 2,
          }}
        >
          <Avatar {...avatar} size={size} />
        </View>
      ))}

      {remaining > 0 && (
        <View
          style={{
            marginLeft: -overlap,
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            backgroundColor: colors.neutral[200],
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.background.primary,
          }}
        >
          <Text
            style={{
              fontSize: sizeMap[size] * 0.4,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.secondary,
            }}
          >
            +{remaining}
          </Text>
        </View>
      )}
    </View>
  );
}