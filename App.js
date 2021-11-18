import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from './src';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/redux/reducers';
import middleware from './src/redux/middleWare';

const store = createStore(reducers, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Navigation />
    </Provider>
  );
}