import { View, Text, Pressable, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import { useRef, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import getCurrentDate from '@/utils/getCurrentDate'
import DefaultEmoji from '@/assets/svg/smile.svg'
import { scaleHorizontal, scaleVertical } from '@/utils/responsive'
import { Emojis } from '@/constants/Emojis'
import BackArrowIcon from '@/assets/svg/back.svg'
import FavouritesIcon from '@/assets/svg/star.svg'
import TrashIcon from '@/assets/svg/trash.svg'
import SaveIcon from '@/assets/svg/save.svg'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import getData from '@/utils/getData'
import storeData from '@/utils/storeData'
import { v4 as uniqueID } from 'uuid';
import "react-native-get-random-values"

// Typescript interfaces for better type checking
interface Note {
  id:  number;
  content: string;
  date: string; // ISO format date string
  isSynced: boolean;
  moodId: string
}
interface GroupedNotes {
  [month: string]: Note[];
}

type Props = {}

const Note = (props: Props) => {
  const params = useLocalSearchParams()
  const fullCurrentDate = getCurrentDate()
  const [currentNoteColor, setCurrentNoteColor] = useState<string>("#fff")
  const [addNoteToFavorites, setAddNoteToFavorites] = useState<boolean>(false)
  const [noteIsSaving, setNoteisSaving] = useState<boolean>(false)
  const [currentNoteContent, setCurrentNoteContent] = useState("")

  const richText = useRef(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleContentSizeChange = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSaveNoteContent = async () => {
    //TODO: get Notes from storage and create a new Array, spread and add the new Note
    const storedNotes = await getData("note", 'object');    
    const notesArray:Note[] = storedNotes ?? []
    console.log(Array.isArray(notesArray),notesArray)
    const updatedNotes = [...notesArray, { id: uniqueID(), content: currentNoteContent, date: new Date().toISOString(), isSynced: false,moodId: params.moodId }]
    console.log(updatedNotes,"updatedNotes")
    await storeData(updatedNotes,"note","object")
    setNoteisSaving(false)
    console.log("Done Saving BITCH")

  }

  useEffect(() => {
    const moodId = params.moodId
    setCurrentNoteColor(Emojis.find(emoji => emoji.id === moodId)?.color ?? '#fff')
  }, [params.moodId])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: currentNoteColor
    }}>
      <View style={{
        marginHorizontal: '4%',
        rowGap: scaleVertical(10)
      }}>
        <View style={{
          paddingTop: scaleVertical(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View style={{
            flexDirection: 'row',
          }}>

            <Pressable onPress={() => router.dismiss()}>
              <BackArrowIcon width={scaleHorizontal(35)} height={scaleVertical(35)} />
            </Pressable>
            <Pressable onPress={() => {
              setNoteisSaving(true)
              handleSaveNoteContent()
              }}>
              <SaveIcon width={scaleHorizontal(30)} height={scaleVertical(30)} />
            </Pressable>
            {
              noteIsSaving &&
              <View style={{
                flexDirection: 'row',
                columnGap: scaleHorizontal(5),
                alignItems: 'center'

              }}>
                <ActivityIndicator color={'black'} />
                <Text>Saving</Text>
              </View>
            }
          </View>
          <View style={{
            flexDirection: 'row',
            columnGap: scaleHorizontal(10)
          }}>
            <Pressable>
              <FavouritesIcon onPress={() => setAddNoteToFavorites(prev => !prev)} width={scaleHorizontal(30)} height={scaleVertical(30)} color={addNoteToFavorites ? "#FFD700" : undefined} stroke={addNoteToFavorites ? "#CCAD00" : "#000000"} />

            </Pressable>
          
            <Pressable>
              <TrashIcon width={scaleHorizontal(30)} height={scaleVertical(30)} />

            </Pressable>
          </View>

        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          height: scaleVertical(65),
          paddingHorizontal: '5%'
        }}>
          <View style={{
            flexDirection: 'row',
            gap: scaleHorizontal(6),
            alignItems: 'baseline'
          }}>

            <Text style={{
              fontWeight: 'bold',
              fontSize: scaleVertical(40)
            }}>{fullCurrentDate.day}</Text>
            <Text style={{
              fontSize: scaleVertical(16),
            }}>{fullCurrentDate.month}</Text>
          </View>
          <DefaultEmoji width={scaleHorizontal(40)} height={scaleVertical(40)} />
        </View>
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: currentNoteColor
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}

      >
        <ScrollView showsVerticalScrollIndicator={false} onContentSizeChange={handleContentSizeChange} ref={scrollViewRef} contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
        }}>
          <RichEditor
            key={currentNoteColor}
            ref={richText}
            style={{
              flex: 1,
              minHeight: Dimensions.get('window').height - 50, // adjust 50 if toolbar height is different
              padding: 10,
              backgroundColor: currentNoteColor
            }}
            editorStyle={{
              backgroundColor: currentNoteColor
            }}
            onChange={(content) => setCurrentNoteContent(content)}
            


            placeholder="Write your title and start your notes ..."
          />
        </ScrollView>
        <View style={{}}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.setStrikethrough,
              actions.checkboxList,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.undo,
              actions.redo,
            ]}
            iconTint="black"
            selectedIconTint="blue"
            selectedButtonStyle={{ backgroundColor: 'transparent' }}
            style={{
              height: 50,
              backgroundColor: 'white',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Note

