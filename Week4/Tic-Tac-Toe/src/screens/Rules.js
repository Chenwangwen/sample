import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/color';
import Title from '../components/Title';
import Message from '../components/Message'; 
import TButton from '../components/TButton'; 


export default function RulesScreen({ navigation }) {
    return (
      <ScrollView style={styles.container}>
        <Title text="Rules" />
        <Message text={`Tic-Tac-Toe is a very simple yet fun game usually played by two players. One player chooses 'X' and the other 'O' to mark their spaces on a 3x3 grid.
      
      The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.
      
      The game can end in a win for one player or a draw if all spaces are filled without anyone achieving the win condition.
      
      Here are some strategies to consider:
      - Try to win: If you have two 'X's or 'O's in a row, place the third one to win.
      - Block your opponent: If your opponent has two in a row, block them with your own symbol.
      - Fork opportunities: Create an opportunity where you can win in two ways.
      - Blocking an opponent's fork: If there is a configuration where the opponent can fork, block that fork.
      - Center control: Play in the center if available.
      - Opposite corner: If the opponent is in the corner, play the opposite corner.
      - Empty corner: Take an empty corner if available.
      - Empty side: Take an empty side if available.
      
      Remember, the first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a draw.`} />
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
});
