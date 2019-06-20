import { AsyncStorage } from 'react-native';

export const store = async (key, value) => {
    console.log('write key', key);
  try {
    await AsyncStorage.setItem('@' + key, value)
  } catch (e) {
    // saving error
  }
}

export const read = async (key) => {
    console.log('read key', key);
    
  try {
    return await AsyncStorage.getItem('@' + key)
  } catch (e) {
    // error reading value
  }
}

export const remove = async (key) => {
    console.log('remove key', key);
    
  try {
    return await AsyncStorage.removeItem('@' + key)
  } catch (e) {
    // error reading value
  }
}
