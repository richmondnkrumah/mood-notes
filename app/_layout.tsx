import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import DEFAULT_TAGS from '@/constants/tags';
import storeData from '@/utils/storeData';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }
  const router = useRouter()
  useEffect(() => {
    storeData(DEFAULT_TAGS,DEFAULT_TAGS.key,"object")
    router.push('/home')
    },[])

  return (
      <Stack screenOptions={{headerShown:false}}/>
  );
}
