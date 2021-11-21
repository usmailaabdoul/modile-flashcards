import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Home from './home';
import Deck from './deck';
import AddCard from './addCard';
import Quiz from './quiz';
import CreateDeck from './addDeck';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Deck" component={Deck} />
      <Stack.Screen name="addCard" component={AddCard} />
      <Stack.Screen name="quiz" component={Quiz} />
    </Stack.Navigator>
  );
}

function AddDeckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="addDeck" component={CreateDeck} options={{ title: "Add new deck" }} />
      <Stack.Screen name="Deck" component={Deck} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeStack') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Add') {
              iconName = focused
                ? 'ios-add-circle'
                : 'ios-add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#948bfe',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 16
          }
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false, tabBarLabel: 'Home'  }} />
        <Tab.Screen name="Add" component={AddDeckStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
