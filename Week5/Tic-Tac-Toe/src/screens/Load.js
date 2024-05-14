import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Alert, View } from 'react-native';
import colors from '../constants/color';
import Title from '../components/Title';
import Message from '../components/Message'; 
import TButton from '../components/TButton'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadGameScreen({ navigation }) {
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    loadSavedGames();
  }, []);

  const loadSavedGames = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      const savedGamesJSON = stores.map((result) => JSON.parse(result[1])).filter(game => game !== null); // 這裡使用 filter 確保移除 null
      setSavedGames(savedGamesJSON);
    } catch (error) {
      console.error('Error loading saved games: ', error);
    }
  };

  const handleDeleteGame = async (gameIndex) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this game?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await AsyncStorage.removeItem(`savedGame_${gameId}`);
            loadSavedGames();
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  const handleLoadGame = (gameId) => {
    const selectedGame = savedGames.find(game => game.id === gameId);
    if (selectedGame) {
      navigation.navigate('Game', { gameData: selectedGame, gameId: gameId });
    } else {
      console.error('Selected game not found.');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Title text="Load Game" />
      {savedGames.length === 0 ? (
        <Message text="No saved games found." />
      ) : (
        savedGames.map((game) => (
          <View key={game.id} style={styles.gameContainer}>
            <Text style={styles.gameText}>{`Game ${game.id}`}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleLoadGame(game.id)}>
                <Text style={styles.buttonText}>Load</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDeleteGame(game.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
        
        
      )}
      <TButton title="Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background, 
  },
  gameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameText: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});