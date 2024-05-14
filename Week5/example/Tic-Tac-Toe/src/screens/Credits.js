import { ScrollView, StyleSheet, View } from 'react-native';
import { TButton } from '../components/TButton';
import { Message } from '../components/Message';
import { Title } from '../components/Title';
import COLOR from '../constants/color';

const text = `In the realm of X's and O's, upon the grid they go, 
Where two contenders face off, in tic-tac-toe.
A pencil mark, a battle stark, lines cross like ancient runes,
Each player seeks, with tactic sleek, to align their threes and twos.

First goes X, with hopes to vex, in the corner she resides,
Then O's response, a parry, a taunt, beside the X she slides.
The square becomes a battleground, where silent warriors clash,
With every mark, they leave their spark, in this timeless match.

A diagonal attempt, an intercept, the X's make their claim,
But O is shrewd, not easily subdued, and blocks the path to fame.
They dance in turns, the board it churns with symbols old as time,
A line unbroken, a token, a sign, of a strategy so sublime.`;

export const Credits = () => {
  return (
    <View style={styles.container}>
      <Title title="Credits" />
      <Message text={text} />
      <TButton title="Back" back={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    borderRadius: 10,
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.LIGHTGREY,
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});