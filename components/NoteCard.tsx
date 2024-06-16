import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Separator, XStack, YStack } from 'tamagui';
import getIconEmoji from '@/utils/getIconEmoji';
import { scaleHorizontal, scaleVertical } from '@/utils/responsive';
import { Emojis } from '@/constants/Emojis';

interface Note {
  id: string;
  content: string;
  date: string; // ISO format date string
  isSynced: boolean;
  moodId: string
}

type Props = {
  data: Note
}

const NoteCard = ({ data }: Props) => {
  const updatedDateMonth = new Date(data.date).toLocaleString('default', { month: 'short' })
  const updatedDateDay = new Date(data.date).toLocaleString('default', { day: '2-digit' })
  console.log(updatedDateDay, updatedDateMonth)
  console.log(data.moodId, Emojis.find(emoji => emoji.id === data.moodId)?.color)

  const cardBackground = Emojis.find(emoji => emoji.id === data.moodId)?.color ?? "#fff";
  
  return (
    <View style={{backgroundColor: cardBackground, padding: scaleVertical(20), flexDirection: 'row', columnGap: scaleHorizontal(15), borderRadius:20 }}>
      <View style={{ alignItems: 'center', justifyContent: 'space-between', }}>
        <Text style={{ fontWeight: '800', fontSize: scaleVertical(25) }}>{updatedDateDay}</Text>
        <Text style={{ fontSize: scaleVertical(14) }}>{updatedDateMonth}</Text>
      </View>
      <Separator borderColor={'$gray10Dark'} alignSelf="stretch" vertical />
      <View style={{
        flex: 1,
        rowGap: scaleVertical(10)
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

        }}>
          <Text style={{ fontWeight: 600, fontSize: scaleVertical(18) }}>Hard Day AF</Text>
          {getIconEmoji(data.moodId, scaleHorizontal(25), scaleVertical(25))}
        </View>
        <View>
          <Text style={{ fontSize: scaleVertical(14) }} ellipsizeMode='tail' numberOfLines={1}>{data.content}</Text>
        </View>
      </View>
    </View>
  )
}

export default NoteCard
