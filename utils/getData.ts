import AsyncStorage from '@react-native-async-storage/async-storage';



const getData = async (key:string, type: 'object' | 'string') => {
  try {
    const Value = await AsyncStorage.getItem(key);
    if (type === "object")
      return Value != null ? JSON.parse(Value) : null;
    return Value
  } catch (e) {
    // error reading value
    console.log(e,"getData Error")
  }
};

export default getData