import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/color';

export default function Board({ gameState, onCellPress }) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.boardContainer}>
        <View style={styles.board}>
          {gameState.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <TouchableOpacity
                key={`cell-${rowIndex}-${colIndex}`}
                style={styles.cell}
                onPress={() => onCellPress(rowIndex, colIndex)}
              >
                <Text style={styles.cellText}>{cell}</Text>
              </TouchableOpacity>
            ))
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    borderWidth: 20,
    borderColor: colors.border,
  },
  board: {    
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    width: 100,
    height: 100,
    backgroundColor: colors.cellBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000'
  },
  cellText: {
    fontSize: 50,
    color: colors.cellText
  },
});
