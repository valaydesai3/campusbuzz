// lib/env.ts
export const ENV = {
  isDevelopment: process.env.EXPO_PUBLIC_APP_ENV === 'development',
  isStaging: process.env.EXPO_PUBLIC_APP_ENV === 'staging',
  isProduction: process.env.EXPO_PUBLIC_APP_ENV === 'production',
  name: process.env.EXPO_PUBLIC_APP_ENV || 'development',
  
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
};

if (!ENV.supabase.url) {
  console.warn('EXPO_PUBLIC_SUPABASE_URL is not set');
}
if (!ENV.supabase.anonKey) {
  console.warn('EXPO_PUBLIC_SUPABASE_ANON_KEY is not set');
}