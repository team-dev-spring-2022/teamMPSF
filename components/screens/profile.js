import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const styles = StyleSheet.create({
  // @todo #35 Добавить стили для страницы профиля
  // Стили пока не добавил
});

const Profile = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const dataFromStore = async () => {
    setLogin((await AsyncStorage.getItem('login')) || null);
    setPassword((await AsyncStorage.getItem('password')) || null);
  };
  dataFromStore();
  // @todo #35 Доделать страницу профиля в будущем
  return (
    <View>
      <Text>Имя:</Text>
      <TextInput placeholder="Имя" value={login} />
      <Text>Фамилия:</Text>
      <TextInput placeholder="Фамилия" />
      <Text>Адрес почты</Text>
      <TextInput placeholder="Адрес почты" />
    </View>
  );
};

export default Profile;
