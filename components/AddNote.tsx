import { View, Text, Pressable} from 'react-native'
import React from 'react'
import AddIcon from '@/assets/svg/add.svg'
import { scaleHorizontal, scaleVertical } from '@/utils/responsive'
import { Link, router } from 'expo-router'

const AddNote = () => {
  return (
    <Pressable style={{
      backgroundColor:'black',
      width:scaleHorizontal(50),
      height:scaleVertical(50),
      justifyContent:'center',
      borderRadius:scaleVertical(25)
    }} onPress={() => router.push('/create')}>
      <AddIcon style={{alignSelf:'center'}} color={'white'} height={scaleVertical(35)} width={scaleHorizontal(35)}/>
    </Pressable>
  )
}

export default AddNote