import { StyleSheet, View } from 'react-native';
import { Board } from "../components/Board";
import { TButton } from '../components/TButton';
import COLOR from '../constants/color';
import { Title } from '../components/Title';
import { useEffect, useState } from 'react';
import { changePlayer, sortTicTacToe, ticTacToeArray, checkWinner, rearrangeBoard, backWard, forward, checkGameCondition, saveGame } from '../datamodel/game';
import { saveAlert } from '../components/Alert';
import { useRoute } from '@react-navigation/native';

export const Home = () => {
  const route = useRoute();
  let loadMovements = route.params ? route.params.movement : [];

  const [tictactoe, setTictactoe] = useState([]);
  const [player, setPlayer] = useState("");
  const [winner, setWinner] = useState("");
  const [movement, setMovement] = useState( []);
  
  useEffect(() => {
    setTictactoe(ticTacToeArray);
    setPlayer("X");
  }, []);

  useEffect(() => {
    if (loadMovements && loadMovements.length > 0) {
      setMovement(loadMovements);
      console.log("Home Screen2222");
    }
  }, [loadMovements]);

  useEffect(() => {
    const newBoard = sortTicTacToe(tictactoe, movement);
    setTictactoe(newBoard);
    const newWinner = checkWinner(movement);
    setWinner(newWinner);
    const newPlayer = changePlayer(player)
    setPlayer(newPlayer);
  }, [movement]);

  const changeBoard = (index) => {
    const movements = rearrangeBoard(winner, player, index, movement);
    setMovement(movements);
  }

  const resetBoard = () => {
    if(route.params) route.params.movement = [];
    setPlayer("");
    setMovement([]);
  }

  const undoBoard = () => {
    const movements = backWard(movement);
    setMovement(movements);
  }

  const redoBoard = () => {
    const movements = forward(movement);
    setMovement(movements);
  }

  return (
    <View style={styles.container}>
      <Title title="Tic Tac Toe" />
      
      {
        <View style={styles.buttonContainer}>

          <TButton title="<"
            disabled={!checkGameCondition(movement).backWard}
            onPress={undoBoard} />

          <TButton title="New Game"
            disabled={!checkGameCondition(movement).reset} 
            onPress={resetBoard} />

          <TButton title=">"
            disabled={!checkGameCondition(movement).forward} 
            onPress={redoBoard} />

        </View>
      }
      <Title color={COLOR.BLACK} title={!winner ? `${player} to play` :  winner.winner != 'Tie' ? `${winner.winner} wins` : 'Tie'} />
      <Board tictactoe={tictactoe} onPress={changeBoard} winnerMovements = {winner?.winnerMovements}/>
      <View style={styles.buttonContainer}>
        <TButton title="Rules" page='Rules' />
        <TButton 
          title="Save" 
          disabled={!winner.winner || loadMovements > 0} 
          onPress={async ()=>{
            try{
              await saveAlert(movement, winner);
              resetBoard();
            }catch(e){
              console.log(e);
            }
          }} />
        <TButton title="Load" page='Load' />
        <TButton title="Credits" page='Credits' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.LIGHTGREY,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  }
});