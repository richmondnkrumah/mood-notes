import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import DEFAULT_TAGS from '@/constants/tags';
import storeData from '@/utils/storeData';
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { tamaguiConfig } from '../tamagui.config'
import { TamaguiProvider } from 'tamagui'
import { useFonts } from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })
  const router = useRouter()

  useEffect(() => {
    const clear = async() => {
      await AsyncStorage.removeItem('note')
      await AsyncStorage.removeItem('notes')
    }
    // clear()
    if (loaded) {
      SplashScreen.hideAsync();
      storeData(DEFAULT_TAGS, DEFAULT_TAGS.key, "object")
      router.push('/home')


    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ToastProvider>
    </TamaguiProvider>

  );
}
