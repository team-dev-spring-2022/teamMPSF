import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export const styles = StyleSheet.create({
  //@todo #10 Добавить стили
});

const LoginActivity = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.titleActivity}>Login</Text>
      <TextInput style={styles.loginPswdTextBox} placeholder={'Login'} />
      <TextInput style={styles.loginPswdTextBox} placeholder={'Password'} />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signButton}>
        <Text style={styles.signButtonText}>sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginActivity;
