import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTokenAndEmail = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const email = await AsyncStorage.getItem('userEmail');
      if (token && email) {
        fetchUserData(token, email);
      } else {
        console.log('Token or email is not set yet.');
      }
    };

    fetchTokenAndEmail();
  }, []);

  const fetchUserData = async (token, email) => {
    try {
      console.log('Fetching user data...');
      const response = await axios.get('http://10.0.2.2:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User data fetched:', response.data);
      const currentUser = response.data.users.find(user => user.email === email);
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.name);
        setEmail(currentUser.email);
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data');
    }
  };

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      console.log('Updating user profile...');
      const response = await axios.post('http://10.0.2.2:3000/users/update', {
        name,
        password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status === "OK") {
        Alert.alert('Success', 'User name and password updated successfully');
        setModalVisible(false);  // Close the modal after successful update
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update user profile');
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userEmail');
    console.log('Signing out...');
    navigation.navigate('SignIn');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.info}>Name: {user.name}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      
      <Button title="Update" onPress={() => setModalVisible(true)} />
      <Button title="Sign Out" onPress={handleSignOut} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Profile</Text>

          <Text style={styles.label}>Update Name:</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          
          <Text style={styles.label}>Update Password:</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          
          <View style={styles.buttonContainer}>
            <Button title="Confirm" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  info: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default UserProfileScreen;
