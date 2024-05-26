import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await axios.get('http://10.0.2.2:3000/orders/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.orders;
});

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, isPaid, isDelivered }) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(
      'http://10.0.2.2:3000/orders/updateorder',
      { orderID: orderId, isPaid, isDelivered },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        // Here we are only updating the specific order's status
        const updatedOrder = action.meta.arg;
        const index = state.orders.findIndex(
          (order) => order.id === updatedOrder.orderId
        );
        if (index !== -1) {
          if (updatedOrder.isPaid !== undefined) {
            state.orders[index].is_paid = updatedOrder.isPaid;
          }
          if (updatedOrder.isDelivered !== undefined) {
            state.orders[index].is_delivered = updatedOrder.isDelivered;
          }
        }
      });
  },
});

export default ordersSlice.reducer;
