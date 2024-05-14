import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { increment, decrement, incrementByValue, incrementAsync, selectCount } from '../store/counterSlice';

export default function Counter() {
    const [value, setValue] = useState("1");
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const getVal = () => {
        const ret = parseInt(value) || 0;
        return ret;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Count: {count}</Text>
            <View style={styles.inputRow}>
                <Text style={styles.text}>Input Value:</Text>
                <TextInput style={styles.input} onChangeText={setValue} value={value} keyboardType="numeric" />
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
                    <Text style={styles.buttonText}>Inc</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
                    <Text style={styles.buttonText}>Dec</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(incrementByValue(getVal()))}>
                    <Text style={styles.buttonText}>Inc by Val</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(incrementAsync(getVal()))}>
                    <Text style={styles.buttonText}>Async Inc</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 10,
        padding: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});
