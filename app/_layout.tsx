import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useAuthStore } from '@/stores/authStore';
import AuthScreen from '@/components/AuthScreen';

export default function RootLayout() {
  useFrameworkReady();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}