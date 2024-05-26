import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, setItems, updateCartItem } from '../store/cartSlice';
import { fetchOrders } from '../store/ordersSlice'; // Import fetchOrders action
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingCart = ({ navigation }) => {
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://10.0.2.2:3000/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.items && response.data.items.length > 0) {
        const cartItems = response.data.items.reduce((acc, item) => {
          if (item.count > 0) {
            acc[item.id] = {
              id: item.id,
              price: item.price || 0,
              quantity: item.count,
              image: `https://fakestoreapi.com/img/${item.id}.jpg`,
              title: item.title || `Product ${item.id}`
            };
          }
          return acc;
        }, {});

        dispatch(setItems(cartItems));
      } else {
        dispatch(setItems({}));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
      console.error('Error stack:', error.stack);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      Alert.alert('Error', 'Failed to fetch cart items');
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (productId, count) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put('http://10.0.2.2:3000/cart', {
        items: [{ id: productId, count }]
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateCartItem({ id: productId, count }));
    } catch (error) {
      console.error('Error updating cart:', error);
      Alert.alert('Error', 'Failed to update cart');
    }
  };

  const checkout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const orderItems = Object.values(items).map(item => ({
        prodID: item.id,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await axios.post('http://10.0.2.2:3000/orders/neworder', { items: orderItems }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setItems({}));
      Alert.alert('Success', 'New order has been created');
      navigation.navigate('MyOrders'); // Navigate to MyOrders screen
      dispatch(fetchOrders()); // Fetch orders immediately after navigating
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      Alert.alert('Error', 'Failed to create order');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.title} - ${(item.price).toFixed(2)}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              dispatch(addItem(item));
              updateCartItemQuantity(item.id, item.quantity + 1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              if (item.quantity > 1) {
                updateCartItemQuantity(item.id, item.quantity - 1);
              } else {
                dispatch(removeItem(item.id));
                updateCartItemQuantity(item.id, 0);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : totalItems > 0 ? (
        <View>
          <Text style={styles.header}>Shopping Cart</Text>
          <View style={styles.separator} />
          <Text style={styles.count}>Total Items: {totalItems}</Text>
          <Text style={styles.count}>Total Price: ${(totalPrice).toFixed(2)}</Text>
          <FlatList
            data={Object.values(items)}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
          <TouchableOpacity onPress={checkout} style={styles.checkoutButton}>
            <Text style={styles.buttonText}>Check Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.emptyCartText}>Your shopping cart is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80, 
    height: 80,
    marginRight: 10,  
    borderRadius: 10,  
  },
  textContainer: {
    flex: 1,  
  },
  itemText: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  quantityText: {
    fontSize: 16,
    minWidth: 40,  
    textAlign: 'center',
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,        
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  separator: {
    height: 2,       
    backgroundColor: '#ccc',  
    marginVertical: 10,  
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ShoppingCart;
