import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Storage from './storage';
import Constants from 'expo-constants';

const NOTIFICATION_KEY = 'NOTIFICATION_KEY';

export async function clearLocalNotification() {
  console.log('Clearing local notification')
  try {
    await Storage.remove(NOTIFICATION_KEY)
    return Notifications.cancelAllScheduledNotificationsAsync
  } catch (error) {
    await schedulePushNotification()
  }
}

export async function schedulePushNotification() {
  try {
    let res = await Storage.loadDataObj(NOTIFICATION_KEY);
    console.log({res})
  } catch (error) {
    console.log(error)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Complete your quiz 🤓",
        body: "👋 don't forget to complete your quiz for today!",
      },
      trigger: { 
        data: new Date().getDate() + 1,
        hour: 20,
        minutes: 0, 
        seconds: 0, 
      },
    });
  }
}

export async function registerForPushNotificationsAsync(token) {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}