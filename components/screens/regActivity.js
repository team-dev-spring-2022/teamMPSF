import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {auth} from '../../firebase';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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

const RegActivity = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Успешная регистрация: ', user.email);
      })
      .catch(error => alert(error.meassage));
  };
  return (
    <View style={styles.main}>
      <Text style={styles.titleActivity}>Register</Text>
      <TextInput
        style={styles.loginPswdTextBox}
        onChangeText={text => {
          setEmail(text);
        }}
        placeholder={'E-mail'}
      />
      <TextInput
        style={styles.loginPswdTextBox}
        onChangeText={text => {
          setPassword(text);
        }}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.loginPswdTextBox}
        placeholder={'Confirm'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signButton}
        onPress={() => {
          navigation.replace('Login');
        }}>
        <Text style={styles.signButtonText}>Already registered? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegActivity;
