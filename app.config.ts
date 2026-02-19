// app.config.ts
import 'dotenv/config';

const IS_DEV = process.env.EXPO_PUBLIC_APP_ENV === 'development';
const IS_STAGING = process.env.EXPO_PUBLIC_APP_ENV === 'staging';

export default {
  expo: {
    name: IS_DEV ? 'CampusBuzz Dev' : IS_STAGING ? 'CampusBuzz Staging' : 'CampusBuzz',
    slug: 'campusbuzz',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    
    scheme: 'campusbuzz',
    
    ios: {
      bundleIdentifier: IS_DEV
        ? 'com.yourcompany.campusbuzz.dev'
        : IS_STAGING
        ? 'com.yourcompany.campusbuzz.staging'
        : 'com.yourcompany.campusbuzz',
      supportsTablet: true,
    },
    
    android: {
      package: IS_DEV
        ? 'com.yourcompany.campusbuzz.dev'
        : IS_STAGING
        ? 'com.yourcompany.campusbuzz.staging'
        : 'com.yourcompany.campusbuzz',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    
    plugins: ['expo-router'],
    
    experiments: {
      typedRoutes: true,
    },
  },
};