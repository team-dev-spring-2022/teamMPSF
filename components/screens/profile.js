import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export const styles = StyleSheet.create({
  // @todo #35 Добавить стили для страницы профиля
  // Стили пока не добавил
});

const Profile = () => {
  // @todo #35 Доделать страницу профиля в будущем
  return (
    <View>
      <Text>Имя:</Text>
      <TextInput placeholder="Имя" />
      <Text>Фамилия:</Text>
      <TextInput placeholder="Фамилия" />
      <Text>Адрес почты</Text>
      <TextInput placeholder="Адрес почты" />
    </View>
  );
};

export default Profile;
