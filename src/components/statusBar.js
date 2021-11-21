import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

export default function CustomeStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}