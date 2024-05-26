import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:3000/users/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userEmail', email);
        console.log('Token stored:', token); // Log the token
        navigation.navigate('UserProfile');
      } else {
        Alert.alert('Error', 'Failed to sign in');
      }
    } catch (error) {
      console.log('Error details:', error); // Log the error details
      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert('Error', 'Wrong email or password');
        } else {
          Alert.alert('Error', error.response.data.message || 'Something went wrong');
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response received from server');
      } else {
        Alert.alert('Error', 'Network error');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with your email and password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Clear" onPress={() => { setEmail(''); setPassword(''); }} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text style={styles.switch} onPress={() => navigation.navigate('SignUp')}>
        Switch to: sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  switch: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignInScreen;