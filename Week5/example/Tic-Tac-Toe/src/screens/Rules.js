import { StyleSheet, View } from 'react-native';
import { TButton } from '../components/TButton';
import { Message } from '../components/Message';
import { Title } from '../components/Title';
import COLOR from '../constants/color';

const text = `1. The game is played on a grid that's 3 squares by 3 squares, totaling 9 squares in all. This simple layout belies the strategic depth of the game.

2. You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares, strategically aiming to create a sequence of three marks in a row, whether vertically, horizontally, or diagonally.

3. The first player to achieve the objective of placing three of their marks consecutively in a row is declared the winner. This can happen in various ways, requiring players to not only think about their own moves but also anticipate and block their opponent's potential winning combinations.

4. When all 9 squares are full, the game is over. If neither player has achieved three marks in a row, the game ends in a tie. This means that players must carefully consider each move to avoid being blocked by their opponent while simultaneously setting up their own winning opportunities.`;
export const Rules = () => {
    return (
      <View style={styles.container}>
        <Title title="Rules"/>
        <Message text={text}/>
        <TButton title="Back" back={true}/>
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
    }
  });