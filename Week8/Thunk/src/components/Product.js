import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default function Product({ product }) {
    return (
        <View style={styles.product}>
            <Text style={styles.title}>{product.title}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    product: {
        padding: 20,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#ededed',
        backgroundColor: '#FFF9C4',
    },
    title: {
        fontSize: 18,
    },
});