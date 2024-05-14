import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Board from '../components/Board'; 
import TButton from '../components/TButton'; 
import colors from '../constants/color'; 
import Title from '../components/Title'; 


export default function HomeScreen({ navigation }) {
  const [gameState, setGameState] = useState([
    ['O', ' ', 'O'],
    ['X', 'O', 'O'],
    ['X', ' ', ' ']
  ]);

  const handleCellPress = (rowIndex, colIndex) => {
    // handler logic here
  };

  return (
<View style={styles.container}>
  <Title text="Tic Tac Toe" />
  <Board gameState={gameState} onCellPress={handleCellPress} />
  <View style={styles.buttonContainer}>
    <TButton title="Rules" onPress={() => navigation.navigate('Rules')} />
    <TButton title="Credits" onPress={() => navigation.navigate('Credits')} />
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
