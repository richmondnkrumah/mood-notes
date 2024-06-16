import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import getGreetingMessage from '@/utils/getGreetingMessage'
import { scaleHorizontal, scaleVertical } from '@/utils/responsive'
import AddNote from '@/components/AddNote'
import getData from '@/utils/getData'
import { groupBy } from 'lodash'
import { useFocusEffect } from 'expo-router'
import NoteCard from '@/components/NoteCard'
const testData = { content: "<div>jsdvhohds</div><div>asdvasd</div><div>asdvbsa;dv</div>", date: "2024-06-16T11:37:24.309Z", id: "1b91f92b-ecba-4c9e-9130-c2143a36b91f", isSynced: false, moodId: 'Happy' }
type Props = {}
interface Note {
  id: string;
  content: string;
  date: string; // ISO format date string
  isSynced: boolean;
  moodId: string
}
interface GroupedNotes {
  [month: string]: Note[];
}
const HomeScreen = (props: Props) => {
  const [allUserNotes, setAllUserNotes] = useState<GroupedNotes>({})

  useFocusEffect(useCallback(() => {
    //TODO Fetch notes from Storage and group am Shit 
    const fecthNotes = async () => {
      const getCurrentNotes = await getData('note', "object")
      console.log(getCurrentNotes, "curerntNotes")
      const fetchedNotes = getCurrentNotes ?? []
      const grouped = groupBy(fetchedNotes, (note) => new Date(note.date).toLocaleString('default', { month: 'long', year: 'numeric' }));
      console.log(grouped, "lll")
      setAllUserNotes(grouped)

    }
    fecthNotes()
  }, []))
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: '4%',
      rowGap:scaleVertical(20)
    }}>
      <View>
        <Text style={{
          fontSize: scaleVertical(40),
          fontWeight: 'bold'
        }}>Good {getGreetingMessage()}!</Text>
        <Text style={{ fontSize: scaleVertical(17) }}>Dont let a bad day make you feel like you have a bad life</Text>
      </View>
      <View style={{ position: 'absolute', bottom: scaleVertical(30), right: '5%' }}>
        <AddNote />
      </View>
      <View>
        {Object.entries(allUserNotes).map(([month, notes]) => (
          <View key={month} style={{
            rowGap:scaleHorizontal(10)
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
              <Text style={{fontSize:scaleVertical(13),alignSelf:'flex-end'}}>{month}</Text>
              <Text style={{borderRadius: 9999, backgroundColor:'#EAEAEC',paddingHorizontal:12,paddingVertical:6,fontWeight:400}}>{notes.length} memories</Text>
            </View>
            <ScrollView contentContainerStyle={{rowGap:scaleVertical(20)}}>
              {notes.map((note) => (
                <NoteCard key={note.id} data={note} />
              ))}
            </ScrollView>
          </View>
        ))}
      </View>
    </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  group: {
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  note: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginBottom: 5,
    borderRadius: 5,
  },
});
