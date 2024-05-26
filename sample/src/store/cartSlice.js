import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.totalItems = Object.values(state.items).reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = Object.values(state.items).reduce((total, item) => total + item.price * item.quantity, 0);
    },
    addItem: (state, action) => {
      const item = state.items[action.payload.id];
      if (item) {
        item.quantity += 1;
      } else {
        state.items[action.payload.id] = { ...action.payload, quantity: 1 };
      }
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
    removeItem: (state, action) => {
      const item = state.items[action.payload];
      if (item) {
        state.totalItems -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        delete state.items[action.payload];
      }
    },
    updateCartItem: (state, action) => {
      const { id, count } = action.payload;
      const item = state.items[id];
      if (item) {
        const difference = count - item.quantity;
        state.totalItems += difference;
        state.totalPrice += difference * item.price;
        item.quantity = count;
      }
    },
  },
});

export const { setItems, addItem, removeItem, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
