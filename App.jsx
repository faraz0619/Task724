import {View} from 'react-native';
import React from 'react';
import MainStack from './src/navigation/MainStack';
import {Provider} from 'react-redux';
import Store from './src/redux/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <MainStack />
    </Provider>
  );
};

export default App;
