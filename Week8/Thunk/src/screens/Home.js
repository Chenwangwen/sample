import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { categories } from '../Categorylist/categories.js';
import Category from '../components/Category.js';
import { loadProductsData, selectProducts } from '../redux/productsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product.js';
import { useEffect, useState } from 'react';

export default function Categories() {
    const { productsData, loading, error } = useSelector(selectProducts);
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProductsData(category));
    }, [category]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Categories</Text>
                <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 10 }}></View>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <Category
                            category={item}
                            onPressFunction={() => setCategory(item)}
                            isSelected={category === item}
                        />
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
            {loading ? <ActivityIndicator /> :
                <View>
                    <Text style={styles.title}>Products</Text>
                    <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 10 }}></View>
                    <FlatList
                        style={{ maxHeight: 300 }}
                        data={productsData[category]}
                        renderItem={({ item }) => (
                            <Product product={item} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
});
