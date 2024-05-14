import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../constants/color';
import { TButton } from './TButton';
import { deleteAlert } from './Alert';

export const GameRow = ({ game, index, games, onGamesChange }) => {
    const deleteGame = async () => {
        await deleteAlert(index);
        const newGames = games.filter((_, i) => i !== index);
        onGamesChange(newGames);
    }
    return (
        <View style={styles.gameRow}>
            <View style={styles.textRow}>
                <Text style={{ fontWeight: 'bold' }}>Result:
                    <Text style={{ fontWeight: 'normal' }}> {game.winner.winner === "Tie" ? game.winner.winner : `${game.winner.winner} Wins`}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold' }}>Steps:
                    <Text style={{ fontWeight: 'normal' }}> {game.movement.length}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold' }}>ID:
                    <Text style={{ fontWeight: 'normal' }}> {game.id}</Text>
                </Text>

            </View>
            <View style={styles.textRow}>
                <Text style={{ fontWeight: 'bold' }}>Date:
                    <Text style={{ fontWeight: 'normal' }}> {game.date}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold' }}>Date:
                    <Text style={{ fontWeight: 'normal' }}> {game.time}</Text>
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TButton title="Load" page="Home" paddingVertical={3} params={game}/>
                <TButton title="Delete" onPress={()=>{deleteGame()}} paddingVertical={3} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    gameRow: {
        justifyContent: 'space-between',
        margin: 8,
        padding: 2,
        backgroundColor: COLOR.LIGHTGREY,
        borderWidth: 1,
        borderRadius: 10,
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'left',
        gap: 7,
        margin: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});