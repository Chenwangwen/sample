import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../store/ordersSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyOrdersScreen = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    console.log('Orders status:', status);
    console.log('Orders data:', orders);
  }, [status, orders]);

  const handleToggleExpand = (orderId) => {
    setExpanded(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const handleUpdateOrderStatus = (orderId, isPaid, isDelivered) => {
    dispatch(updateOrderStatus({ orderId, isPaid, isDelivered }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', `Order status has been updated`);
        dispatch(fetchOrders());
      })
      .catch((error) => {
        Alert.alert('Error', `Failed to update order status: ${error.message}`);
      });
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <TouchableOpacity onPress={() => handleToggleExpand(item.id)}>
        <View style={styles.orderHeader}>
          <Text>Order ID: {item.id}</Text>
          <Text>Number of Items: {item.item_numbers}</Text>
          <Text>Total Price: ${(item.total_price / 100).toFixed(2)}</Text>
          <Ionicons name={expanded[item.id] ? 'caret-up' : 'caret-down'} size={20} />
        </View>
      </TouchableOpacity>
      {expanded[item.id] && (
        <View style={styles.orderDetails}>
          <FlatList
            data={JSON.parse(item.order_items)}
            keyExtractor={(product) => product.prodID.toString()}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Text>Product ID: {item.prodID}</Text>
                <Text>Price: ${(item.price).toFixed(2)}</Text>
                <Text>Quantity: {item.quantity}</Text>
              </View>
            )}
          />
          {item.is_paid === 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleUpdateOrderStatus(item.id, 1, item.is_delivered)}
            >
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
          )}
          {item.is_delivered === 0 && item.is_paid === 1 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleUpdateOrderStatus(item.id, item.is_paid, 1)}
            >
              <Text style={styles.buttonText}>Receive</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const newOrders = orders.filter(order => order.is_paid === 0);
  const paidOrders = orders.filter(order => order.is_paid === 1 && order.is_delivered === 0);
  const deliveredOrders = orders.filter(order => order.is_delivered === 1);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <View>
        <TouchableOpacity onPress={() => handleToggleExpand('new')}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>New Orders ({newOrders.length})</Text>
            <Ionicons name={expanded['new'] ? 'caret-up' : 'caret-down'} size={20} />
          </View>
        </TouchableOpacity>
        {expanded['new'] && (
          <FlatList
            data={newOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
          />
        )}
      </View>
      <View>
        <TouchableOpacity onPress={() => handleToggleExpand('paid')}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Paid Orders ({paidOrders.length})</Text>
            <Ionicons name={expanded['paid'] ? 'caret-up' : 'caret-down'} size={20} />
          </View>
        </TouchableOpacity>
        {expanded['paid'] && (
          <FlatList
            data={paidOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
          />
        )}
      </View>
      <View>
        <TouchableOpacity onPress={() => handleToggleExpand('delivered')}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Delivered Orders ({deliveredOrders.length})</Text>
            <Ionicons name={expanded['delivered'] ? 'caret-up' : 'caret-down'} size={20} />
          </View>
        </TouchableOpacity>
        {expanded['delivered'] && (
          <FlatList
            data={deliveredOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetails: {
    marginTop: 10,
  },
  productContainer: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyOrdersScreen;
