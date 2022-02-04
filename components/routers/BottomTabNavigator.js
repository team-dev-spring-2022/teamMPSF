import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainActivity from '../screens/mainActivity';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainActivity" component={MainActivity} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
