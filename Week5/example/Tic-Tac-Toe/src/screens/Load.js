import { StyleSheet, View, FlatList} from 'react-native';
import { TButton } from '../components/TButton';
import COLOR from '../constants/color';
import { Title } from '../components/Title';
import { GameRow } from '../components/GameRow';
import { useEffect, useState } from 'react';
import { loadData } from '../datamodel/savedata';

export const Load = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadData();
            setGames(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        
    }, [games]);

    const onGamesChange = (newGames) => {
        setGames(newGames);
    }

  return (
    <View style={styles.container}>
        <Title title="Load Game" />
        <FlatList
            style={styles.list}
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => <GameRow game={item} index={index} games={games} onGamesChange={onGamesChange} />}
        />
        <View style={styles.buttonContainer}>
            <TButton title="Back" back={true} />
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
        paddingVertical: 10,
    },
    list: {
        backgroundColor: COLOR.DARKGRAY,
        borderRadius: 10,
        marginVertical: 20,
       
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    }
  });