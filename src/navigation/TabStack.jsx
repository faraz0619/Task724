import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {ImagePicker, Items, Users, Videos} from '../screens';

const TabStack = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:"white",
        tabBarStyle: {
          backgroundColor: '#4c85e0',
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: 12,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: '#ffff',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen name="Items" component={Items} />
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="Images" component={ImagePicker} />
      <Tab.Screen name="Videos" component={Videos} />
    </Tab.Navigator>
  );
};

export default TabStack;
