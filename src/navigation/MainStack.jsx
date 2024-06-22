import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabStack from './TabStack';
import { AddUsers } from '../screens';

const MainStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#62b1e3'},
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{title: 'Header'}}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUsers}
          options={{title: 'Add Users'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
