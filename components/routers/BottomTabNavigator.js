import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainActivity from '../screens/mainActivity';
import LoginActivity from '../screens/loginActivity';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainActivity" component={LoginActivity} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
