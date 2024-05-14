import { Alert } from "react-native";
import { saveGame } from "../datamodel/game";
import { deleteData } from "../datamodel/savedata";


export const saveAlert = (movement, winner) => {
    return new Promise((resolve, reject) => {
        Alert.alert('Save Game', 'Are you sure to save the game?', [
            {
                text: 'Save and start a new game',
                onPress: async () => {
                    const game = {
                        movement,
                        winner,
                        date: new Date().toLocaleDateString(),
                        time: new Date().toLocaleTimeString(),
                    }
                    await saveGame(game)
                    resolve();
                }

            },
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel'
            }
        ]);
    });
};

export const deleteAlert = (index) => {
    return new Promise((resolve, reject) => {
    Alert.alert('Delete Game', 'Are you sure to delete the game?', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'Delete', onPress: async() => {
            await deleteData(index);
            resolve();
        },},
    ]);
    });
}