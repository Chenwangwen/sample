import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { addItem } from '../store/cartSlice';

const ProductDetail = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const productId = route.params.productId;

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Product data fetched:', data); // 添加调试日志
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetching error:', error);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
      Alert.alert("Success", "The item has successfully been added to the cart");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return <View style={styles.centered}><Text>Product not found</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title || 'No title available'}</Text>
        <View style={styles.box}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.content}>{product.rating?.rate || 'No rating'}</Text>
          <Text style={styles.label}>Sold:</Text>
          <Text style={styles.content}>{product.rating?.count || 'No count'}</Text>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.price}>${product.price?.toFixed(2) || 'No price'}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Icon name="backspace-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Icon name="cart-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>{product.description || 'No description available'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f6f6f6',
    borderRadius: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flexGrow: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  descriptionBox: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 4,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },
});

export default ProductDetail;
