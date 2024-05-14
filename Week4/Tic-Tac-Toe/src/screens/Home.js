import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Board from '../components/Board';
import TButton from '../components/TButton';
import colors from '../constants/color';
import Title from '../components/Title';
import {
  getInitialGameState,
  checkForWinner,
  checkForDraw,
  createHistory,
  addStateToHistory,
  getCurrentState,
  getCurrentPlayer,
} from '../datamodel/game';

export default function HomeScreen({ navigation }) {
  const [history, setHistory] = useState(createHistory());
  const [currentStep, setCurrentStep] = useState(0);

  const gameState = history[currentStep] ? history[currentStep].state : getInitialGameState();
  const currentPlayer = history[currentStep] ? history[currentStep].currentPlayer : 'X';

  const handleCellPress = (rowIndex, colIndex) => {
    if (gameState[rowIndex][colIndex] !== ' ' || currentStep !== history.length - 1) return;

    const updatedState = gameState.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? currentPlayer : cell))
    );

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const newHistory = addStateToHistory(history, updatedState, nextPlayer);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);

    if (checkForWinner(updatedState, currentPlayer)) {
      Alert.alert('Game Over', `Player ${currentPlayer} has won!`, [{ text: 'Restart', onPress: resetGame }]);
    } else if (checkForDraw(updatedState)) {
      Alert.alert('Game Over', 'The game is a draw!', [{ text: 'Restart', onPress: resetGame }]);
    }
  };

  const handleBackward = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const handleForward = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, history.length - 1));
  };

  const resetGame = () => {
    setHistory(createHistory());
    setCurrentStep(0);
  };

  const isBackDisabled = currentStep === 0;
  const isForwardDisabled = currentStep >= history.length - 1;
  const isNewgameDisabled = history.length <= 1;

  return (
    <View style={styles.container}>
      <Title text="Tic Tac Toe" />
      <View style={styles.navigationContainer}>
        <TButton title="<" onPress={handleBackward} disabled={isBackDisabled} />
        <TButton title="New Game" onPress={resetGame} disabled={isNewgameDisabled}/>
        <TButton title=">" onPress={handleForward} disabled={isForwardDisabled} />
      </View>
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
