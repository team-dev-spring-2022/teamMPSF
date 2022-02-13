import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainActivity from '../screens/mainActivity';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // @todo #35 надо добавить еще страницы
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainActivity" component={MainActivity} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
