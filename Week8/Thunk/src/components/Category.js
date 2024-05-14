import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Category({ category, onPressFunction, isSelected }) {
    return (
        <TouchableOpacity onPress={onPressFunction}>
            <View style={[styles.category, isSelected && styles.selected]}>
                <Text style={styles.title}>{category.replace(/\S*/g, (match) => match.charAt(0).toUpperCase() + match.substr(1).toLowerCase())}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    category: {
        padding: 20,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#ededed',
    },
    title: {
        fontSize: 18,
    },
    selected: {
        backgroundColor: '#DDEEFF', 
        borderColor: 'blue', 
        borderWidth: 2, 
    }
});
