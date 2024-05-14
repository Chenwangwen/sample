import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductDetail } from './ProductDetail';
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const products = [
  { id: 1, name: "Computer desk", price: 300 },
  { id: 2, name: "Desk", price: 50 }
];

const ProdList = () => {
  const navigation = useNavigation();
  const selectProduct = (id) => {
    const prod = products.find((prod) => prod.id === id);
    navigation.navigate("ProductDetail", { prod });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={products}
        keyExtractor={(prod) => prod.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productView}>
            <Pressable onPress={() => selectProduct(item.id)}>
              <Text>Product: {item.name} Price: {item.price}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export const Products = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProdList" 
        component={ProdList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail" 
        component={ProductDetail}
        options={{ headerShown: false }}
      />      
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    margin: 25,
    borderWidth: 1,
    borderRadius: 10,
  },
});
