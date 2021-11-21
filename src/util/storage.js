import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  storeInfoString: async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  storeInfoObj: async (key, data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  loadDataString: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }

      let e = 'Data not found';
      throw e;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  loadDataObj: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }

      let e = 'Data not found';
      throw e;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
