import { Text, View, Pressable, ScrollView, StyleSheet,Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CloseIcon from '@/assets/svg/close.svg'
import { scaleHorizontal, scaleVertical } from '@/utils/responsive'
import { router } from 'expo-router'
import { Emojis } from '@/constants/Emojis'
import getIconEmoji from '@/utils/getIconEmoji'
import getData from '@/utils/getData'
import DEFAULT_TAGS from '@/constants/tags'
import type { TAG } from '@/constants/tags'
import DoubleArrowIcon from '@/assets/svg/double-arrow.svg'
import SingleArrowIcon from '@/assets/svg/right-arrow.svg'

const index = () => {
  const numColumns = 3;
  const emojiRows = [];

  for (let i = 0; i < Emojis.length; i += numColumns) {
    const rowItems = Emojis.slice(i, i + numColumns);
    emojiRows.push(rowItems);
  }
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string>()
  const [allTags, setAllTags] = useState<TAG[]>([])
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  const checkIsSelected = (tagId: number) => selectedTags.includes(tagId.toString());
  useEffect(() => {

    async function getTags() {
      const getAllTags = await getData(DEFAULT_TAGS.key, "object")
      setAllTags(getAllTags.items)
    }
    getTags()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',marginBottom:scaleVertical(15) }}>
      <View style={{ marginHorizontal: '4%', flex: 1, rowGap: scaleVertical(15) }}>
        <View style={{
          alignItems: 'flex-end',
          paddingTop: scaleVertical(10)
        }}>
          <Pressable onPress={() => router.dismiss()}>
            <CloseIcon width={scaleHorizontal(30)} height={scaleVertical(30)} />
          </Pressable>
        </View>
        <View>
          <Text style={{
            fontSize: scaleVertical(40),
            fontWeight: 'bold'
          }}>Dear {"Hilla"}!</Text>
          <Text style={{ fontSize: scaleVertical(17) }}>How are you feeling?</Text>
        </View>
        <View style={{ rowGap: scaleVertical(15) }}>
          {emojiRows.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {row.map((item, itemIndex) => (
                <Pressable
                  key={itemIndex}
                  onPress={() => setSelectedMood(item.name)}
                  style={[{ width: scaleHorizontal(110), height: scaleVertical(100), borderRadius: 10, justifyContent: 'center', alignItems: 'center', rowGap: scaleVertical(5)},selectedMood === item.name ? {backgroundColor:'black'} : { backgroundColor: item.color}]}
                >
                  {getIconEmoji(item.name, scaleHorizontal(30), scaleVertical(30))}
                  <Text style={[{ fontSize: scaleVertical(16)}, selectedMood === item.name ? {color:'white'}: {color: 'black'}]}>{item.name}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
        <View style={{marginTop:scaleVertical(15),flex:1,rowGap:scaleVertical(10)}}>
          <Text style={{ fontWeight: 'bold', fontSize: scaleVertical(17) }}>What was it about?</Text>
          <ScrollView contentContainerStyle={styles.tagsContainer}>
            {allTags.map((tag) => (
              <Pressable
                key={tag.id}
                onPress={() => toggleTag(tag.id.toString())}
                style={[
                  styles.tag,
                  checkIsSelected(tag.id) ? styles.selectedTag : styles.unselectedTag,
                ]}
              >
                <Text style={checkIsSelected(tag.id) ? styles.selectedTagText : styles.unselectedTagText}>
                  {tag.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View>
            <Pressable onPress={() => {
              if(selectedMood)
                router.replace(`/create/120?moodId=${selectedMood}&tags=${selectedTags}`)
              else {
                Alert.alert("No Mood Selected","Please Select a Mood to create a Note")
              }
              }} style={{ backgroundColor: 'black', width: scaleHorizontal(100), height: scaleVertical(50), borderRadius: 15, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row',alignSelf:'center',padding:10 }}>
              <Text style={{ color: 'white', fontSize: scaleVertical(16) }}>
                Next
              </Text>
              <SingleArrowIcon color={'#fff'} width={scaleHorizontal(15)} height={scaleVertical(15)} />
            </Pressable>
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: scaleHorizontal(20),
    paddingVertical: scaleVertical(8),
    borderRadius: 9999,
    margin: 5,
    borderWidth: 2
  },
  selectedTag: {
    backgroundColor: '#000',
  },
  unselectedTag: {
    backgroundColor: '#fff',
  },
  selectedTagText: {
    color: '#fff',
    fontSize: scaleVertical(13)
  },
  unselectedTagText: {
    color: '#000',
    fontSize: scaleVertical(13)

  },
});