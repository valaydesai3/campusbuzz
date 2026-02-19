import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { EnvBanner } from '../components/EnvBanner';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <EnvBanner />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}