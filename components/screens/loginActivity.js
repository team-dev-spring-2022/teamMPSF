import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    alignItems: 'center',
    paddingTop: '33%',
  },
  container: {
    backgroundColor: '#FFFFFF',
    height: '33%',
    width: '100%',
    alignItems: 'center',
  },
  titleActivity: {
    fontSize: 24,
    marginBottom: 30,
    color: '#000000',
  },
  loginPswdTextBox: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  loginButton: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: '#323232',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  signButton: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signButtonText: {
    color: '#9F9F9F',
    fontSize: 17,
  },
});

const LoginActivity = ({navigation}) => {
  // @todo #24 Добавить функцию входа
  return (
    <View style={styles.main}>
      <Text style={styles.titleActivity}>Login</Text>
      <TextInput style={styles.loginPswdTextBox} placeholder={'Login'} />
      <TextInput
        style={styles.loginPswdTextBox}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          navigation.replace('TabNavigation');
        }}>
        <Text style={styles.loginButtonText}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signButton}
        onPress={() => {
          navigation.replace('SignUp');
        }}>
        <Text style={styles.signButtonText}>sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginActivity;
