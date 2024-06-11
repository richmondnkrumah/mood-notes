import { View, Text } from 'react-native'
import React from 'react'
import getGreetingMessage from '@/utils/getGreetingMessage'
import { scaleVertical } from '@/utils/responsive'
import AddNote from '@/components/AddNote'
type Props = {}

const HomeScreen = (props: Props) => {
  return (
    <View style={{
      flex: 1,
      backgroundColor:'white',
      paddingHorizontal:'4%'
    }}>
      <View>
        <Text style={{
          fontSize:scaleVertical(40),
          fontWeight:'bold'
        }}>Good {getGreetingMessage()}!</Text>
        <Text style={{fontSize:scaleVertical(17)}}>Dont let a bad day make you feel like you have a bad life</Text>
      </View>
      <View style={{position:'absolute', bottom:scaleVertical(30),right:'5%'}}>
        <AddNote />
      </View> 
    </View>
  )
}

export default HomeScreen