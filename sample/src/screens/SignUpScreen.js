import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    console.log('Sign Up button pressed'); // 測試按鈕是否觸發
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:3000/users/signup', {
        name,
        email,
        password
      });

      if (response && response.data) {
        const data = response.data;
        console.log('Response data:', data); // 測試API響應
        if (data.status === "OK") {
          Alert.alert('Success', 'User registered successfully');

          // 将token和email存储到AsyncStorage
          await AsyncStorage.setItem('userToken', data.token);
          await AsyncStorage.setItem('userEmail', email);

          setTimeout(() => {
            navigation.navigate('UserProfile');
          }, 1500);  // 延遲 1.5 秒後跳轉
        } else {
          Alert.alert('Error', data.message || 'Registration failed');
        }
      } else {
        Alert.alert('Error', 'Unexpected response format');
      }
    } catch (error) {
      console.error('Error:', error);  // 打印錯誤詳細信息
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.message || 'Something went wrong');
      } else {
        Alert.alert('Error', 'Network error or server is not reachable');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up a new user</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
      <Button title="Clear" onPress={() => { setName(''); setEmail(''); setPassword(''); }} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.switch} onPress={() => navigation.navigate('SignIn')}>
        Switch to: sign in
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

export default SignUpScreen;
