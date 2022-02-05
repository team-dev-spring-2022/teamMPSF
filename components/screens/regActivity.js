import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export const styles = StyleSheet.create({
  // @todo #7 Добавить стили
});

const RegActivity = () => {
  // @todo #7 Добавить функционал
  return (
    <View style={styles.main}>
      <Text style={styles.titleActivity}>Sign Up</Text>
      <TextInput style={styles.loginPswdTextBox} placeholder={'Login'} />
      <TextInput style={styles.loginPswdTextBox} placeholder={'Password'} />
      <TextInput style={styles.loginPswdTextBox} placeholder={'Name'} />
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.exitButton}>
        <Text style={styles.exitButtonText}>exit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegActivity;
