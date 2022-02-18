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
  main: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: '#323232',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  textBox: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  textBoxText: {
    color: '#000000',
    fontSize: 17,
  },
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
    <View style={styles.main}>
      <View style={styles.label}>
        <Text style={styles.labelText}>Имя:</Text>
      </View>
      <View style={styles.textBox}>
        <TextInput style={styles.textBoxText} placeholder="Имя" value={login} />
      </View>
      <View style={styles.label}>
        <Text style={styles.labelText}>Фамилия:</Text>
      </View>
      <View style={styles.textBox}>
        <TextInput style={styles.textBoxText} placeholder="Фамилия" />
      </View>
      <View style={styles.label}>
        <Text style={styles.labelText}>Адрес почты</Text>
      </View>
      <View style={styles.textBox}>
        <TextInput style={styles.textBoxText} placeholder="Адрес почты" />
      </View>
    </View>
  );
};

export default Profile;
