import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from '../components/Board';
import TButton from '../components/TButton';
import Title from '../components/Title';
import colors from '../constants/color';

import {
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
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState(getCurrentPlayer(history));
  const [winningLine, setWinningLine] = useState([]);
  const [gameState, setGameState] = useState(getCurrentState(history));

  useEffect(() => {
    const updatedGameState = getCurrentState(history, currentStep);
    const currentPlayer = getCurrentPlayer(history, currentStep);
    setGameState(updatedGameState);
    setGameStatus(`${currentPlayer} to play`);
  }, [history, currentStep]);

  const handleCellPress = (rowIndex, colIndex) => {
    if (gameOver || gameState[rowIndex][colIndex] !== ' ') return;

    const currentPlayer = getCurrentPlayer(history, currentStep);
    const updatedState = gameState.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? currentPlayer : cell))
    );
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const newHistory = addStateToHistory(history, updatedState, nextPlayer);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);

    const result = checkForWinner(updatedState, currentPlayer);
    if (result.winner) {
      setTimeout(() => {
        setGameOver(true);
        setGameStatus(`${currentPlayer} Wins`);
        setWinningLine(result.line);
      }, 500);
    } else if (checkForDraw(updatedState)) {
      setTimeout(() => {
        setGameOver(true);
        setGameStatus('Tie');
        setWinningLine([]);
      }, 500);
    } else {
      setGameStatus(`${nextPlayer} to play`);
    }
  };

  const resetGame = () => {
    const newHistory = createHistory();
    setHistory(newHistory);
    setCurrentStep(0);
    setGameOver(false);
    setGameStatus(`${getCurrentPlayer(newHistory)} to play`);
    setWinningLine([]);
  };

  const handleSavePress = () => {
    Alert.alert(
      'Confirm Save',
      'Are you sure you want to save the current game?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Save', onPress: saveGame }
      ],
      { cancelable: false }
    );
  };

  const saveGame = async () => {
    try {
      let gameIdCounter = parseInt(await AsyncStorage.getItem('gameIdCounter')) || 1;
      const gameData = {
        gameId: gameIdCounter,
        winner: gameStatus.includes('Wins') ? gameStatus.split(' ')[0] : '',
        totalSteps: currentStep,
        gameState: gameState
      };
      await AsyncStorage.setItem(`savedGame_${gameIdCounter}`, JSON.stringify(gameData));
      gameIdCounter++;
      await AsyncStorage.setItem('gameIdCounter', gameIdCounter.toString());
      Alert.alert('Game Saved', 'Your game has been saved successfully!');
      resetGame(); // Consider if you really want to reset after save.
    } catch (error) {
      console.error('Failed to save the game:', error);
    }
  };

   // 處理後退按鈕的事件，減少當前步驟。
   const handleBackward = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
    console.log("Current Step:", currentStep);
    const updatedStep = Math.max(currentStep - 1, 0);
    const updatedGameState = getCurrentState(history, updatedStep);
    const currentPlayer = getCurrentPlayer(history, updatedStep);
    console.log("Updated GameState:", updatedGameState);
    console.log("Updated Current Player:", currentPlayer);
    setGameState(updatedGameState);
    setGameStatus(`${currentPlayer} to play`);
  };
  

  // 處理前進按鈕的事件，增加當前步驟。
  const handleForward = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, history.length - 1));
  };

   // 判斷後退和前進按鈕是否應該被禁用。
   const isBackDisabled = currentStep === 0;
   const isForwardDisabled = currentStep >= history.length - 1;
  

  return (
    <View style={styles.container}>
      <Title text={gameStatus} />
      <View style={styles.navigationContainer}>
        <TButton title="<" onPress={handleBackward} disabled={isBackDisabled} />
        <TButton title="New Game" onPress={resetGame} />
        <TButton title=">" onPress={handleForward} disabled={isForwardDisabled} />
      </View>
      <Board gameState={gameState} onCellPress={handleCellPress} winningLine={winningLine} />
      <View style={styles.buttonContainer}>
        <TButton title="Load" onPress={() => navigation.navigate('Load')} />
        <TButton title="Save" onPress={handleSavePress} disabled={!gameOver} />
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
