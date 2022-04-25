import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {auth} from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  title: {
    marginTop: '5%',
    marginLeft: '10%',
    fontSize: 24,
    color: '#000000',
    marginBottom: '10%',
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

const Profile = ({navigation}) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        AsyncStorage.setItem('logged', 'no');
        AsyncStorage.setItem('email', '');
        AsyncStorage.setItem('password', '');
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  // @todo #35 Доделать страницу профиля в будущем
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Profile</Text>
      <ScrollView>
        <View style={styles.label}>
          <Text style={styles.labelText}>Адрес почты</Text>
        </View>
        <View style={styles.textBox}>
          <TextInput
            style={styles.textBoxText}
            placeholder="Адрес почты"
            value={auth.currentUser?.email}
          />
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>Имя:</Text>
        </View>
        <View style={styles.textBox}>
          <TextInput style={styles.textBoxText} placeholder="Имя" />
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>Фамилия:</Text>
        </View>
        <View style={styles.textBox}>
          <TextInput style={styles.textBoxText} placeholder="Фамилия" />
        </View>
        <TouchableOpacity onPress={handleSignOut}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Выйти</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;
