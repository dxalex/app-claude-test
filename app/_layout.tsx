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

  // Using system fonts for now. To use custom fonts:
  // 1. Download Rubik and Space Grotesk from Google Fonts
  // 2. Place .ttf files in assets/fonts/
  // 3. Update this to: require('../assets/fonts/FontName.ttf')
  const [fontsLoaded] = useFonts({});

  useEffect(() => {
    // Load user data and hide splash screen
    const prepare = async () => {
      await SplashScreen.hideAsync();
      loadUser();
      loadData();
    };

    prepare();
  }, []);

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
