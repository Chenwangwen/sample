import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import TButton from '../components/TButton';

const MainScreen = () => {
  const [url, setUrl] = useState('');
  const [showImage, setShowImage] = useState(false); 

  const handlePress = () => {
    setShowImage(true); 
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Input Image URL:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUrl}
        value={url}
        placeholder="Input Image URL"
      />
      <TButton title="Submit" onPress={handlePress} />
      {url ? <Image source={{ uri: url }} style={styles.image} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleText: { 
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});

export default MainScreen;
