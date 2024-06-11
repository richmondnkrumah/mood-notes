import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MenuIcon from '@/assets/svg/menu.svg'
import SearchIcon from '@/assets/svg/search.svg'
import { scaleHorizontal,scaleVertical } from '@/utils/responsive'
type Props = {}

const HomeHeaderRight = (props: Props) => {
  return (
    <View style={{
      flexDirection: 'row',
      columnGap: scaleHorizontal(10),
      marginVertical:scaleVertical(10)
    }}>
      <Pressable>
        <SearchIcon width={30} height={30}/>
      </Pressable>
      <Pressable>
        <MenuIcon width={30} height={30}/>
      </Pressable>
    </View>
  )
}

export default HomeHeaderRight