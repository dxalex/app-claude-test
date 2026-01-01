import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/store/authStore';
import { useAnimeStore } from '@/store/animeStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loadUser = useAuthStore((state) => state.loadUser);
  const loadData = useAnimeStore((state) => state.loadData);

  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nBrXw.ttf'),
    'Rubik-Medium': require('https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nMrXw.ttf'),
    'Rubik-SemiBold': require('https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nFrXw.ttf'),
    'Rubik-Bold': require('https://fonts.gstatic.com/s/rubik/v28/iJWKBXyIfDnIV7nPrXw.ttf'),
    'SpaceGrotesk-Regular': require('https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj62UUsjNsFjTDJK.ttf'),
    'SpaceGrotesk-Medium': require('https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUUsjNsFjTDJK.ttf'),
    'SpaceGrotesk-SemiBold': require('https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4KUksjNsFjTDJK.ttf'),
    'SpaceGrotesk-Bold': require('https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj5mUksjNsFjTDJK.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      loadUser();
      loadData();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0B1020' },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
      </Stack>
    </>
  );
}
