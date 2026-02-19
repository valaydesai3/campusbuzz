import { View, Text } from 'react-native';
import { ENV } from '../lib/env';

export const EnvBanner = () => {
  if (ENV.isProduction) return null;

  const bgColor = ENV.isDevelopment ? '#EAB308' : '#F97316';

  return (
    <View style={{ backgroundColor: bgColor, marginVertical: 32, paddingVertical: 16, paddingHorizontal: 12 }}>
      <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
        {ENV.name.toUpperCase()} MODE
      </Text>
    </View>
  );
};