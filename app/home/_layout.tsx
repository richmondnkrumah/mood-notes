import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HomeHeaderRight from '@/components/HomeHeaderRight'
import { scaleHorizontal, scaleVertical } from '@/utils/responsive'

type Props = {}
const HomeScreenLayout = (props: Props) => {
  return (
      <Stack screenOptions={{
        headerRight: () => <HomeHeaderRight/>,
        headerLeft: () => <View style={{ width: scaleHorizontal(40), marginVertical: scaleVertical(10), height: scaleVertical(40) }}><Image style={{ width: '100%', height: '100%', borderRadius: scaleVertical(20) }} resizeMode='cover' source={require("@/assets/images/profile.jpg")} /></View>,
        headerShadowVisible: false,
        headerTitle: ''
      }}>
        <Stack.Screen name='index' />
      </Stack>
  )
}

export default HomeScreenLayout