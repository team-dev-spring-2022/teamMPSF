import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import LoginActivity from '../screens/loginActivity';
import RegActivity from '../screens/regActivity';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name={'Login'} component={LoginActivity} />
      <Stack.Screen name={'SignUp'} component={RegActivity} />
      <Stack.Screen name={'TabNavigation'} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
