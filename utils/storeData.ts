import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: {} | string,key: string, type: 'object' | 'string') => {
  try {
    let Value = value
    if (type === "object") {

      Value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, Value as string);
  } catch (e) {
    // saving error
    console.log(e,"storeData Error")

  }
};

export default storeData