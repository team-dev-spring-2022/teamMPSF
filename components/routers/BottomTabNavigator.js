import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainActivity from '../screens/mainActivity';
import Profile from '../screens/profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PastActivity from '../screens/pastActivity';
import FutureActivity from '../screens/futureActivity';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // @todo #35 надо добавить еще страницы
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainActivity"
        component={MainActivity}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FutureActivity"
        component={FutureActivity}
        options={{
          headerShown: false,
          tabBarLabel: 'Future',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="alpha-f-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PastActivity"
        component={PastActivity}
        options={{
          headerShown: false,
          tabBarLabel: 'Past',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="alpha-p-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
