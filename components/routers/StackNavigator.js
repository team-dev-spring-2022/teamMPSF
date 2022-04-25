import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import LoginActivity from '../screens/loginActivity';
import RegActivity from '../screens/regActivity';
import {auth} from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [initRoute, setInitRoute] = useState(null);
  useEffect(() => {
    const isLogged = async () => {
      const logged = await AsyncStorage.getItem('logged');
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      console.log(logged, email, password);
      if (logged === 'yes') {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            setInitRoute('TabNavigation');
            console.log('Успешный вход: ', user.email);
          })
          .catch(error => alert(error.message));
      } else {
        setInitRoute('Login');
      }
    };
    isLogged();
  }, []);

  if (initRoute === null) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initRoute}>
      <Stack.Screen name={'Login'} component={LoginActivity} />
      <Stack.Screen name={'SignUp'} component={RegActivity} />
      <Stack.Screen name={'TabNavigation'} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
