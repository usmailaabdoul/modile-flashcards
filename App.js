import React from 'react';
import Navigation from './src';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/redux/reducers';
import middleware from './src/redux/middleWare';
import CustomeStatusBar from './src/components/statusBar';

const store = createStore(reducers, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <CustomeStatusBar backgroundColor={'#948bfe'} style="light" />
      <Navigation />
    </Provider>
  );
}