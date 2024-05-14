import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const gameState = [
    ['O', ' ', 'O'],
    ['X', 'X', 'O'],
    ['X', ' ', 'O']
  ];

  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <View style={styles.board}>
          {gameState.map((row, rowIndex) => (
            row.map((cell, cellIndex) => (
              <TouchableOpacity key={`cell-${rowIndex}-${cellIndex}`} style={styles.cell}>
                <Text style={styles.cellText}>{cell}</Text>
              </TouchableOpacity>
            ))
          ))}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    padding: 20,
    backgroundColor: 'orange',
  },
  board: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderColor: '#000',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    backgroundColor: '#006400',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000'
  },
  cellText: {
    color: '#fff',
    fontSize: 50
  }
});
