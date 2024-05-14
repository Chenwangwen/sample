// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../service/apiService";
// Define an initial state
const initialState = {
  productsData: {},
  loading: false,
  error: null,
};

// Create an asynchronous thunk action
export const loadProductsData = createAsyncThunk(
  "loadProducts",
  async (category, thunkAPI) => {
    if (!category)
      return thunkAPI.rejectWithValue("Category can't be empty.");
    const products = thunkAPI.getState().products?.productsData[category];
    if (products)
      return { id: category, data: products };
    try {
      const ret = await await fetchData('products/category/' + category);
      return { id: category, data: ret };;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { id, data } = action.payload;
        if (!state.productsData[id]) state.productsData[id] = data;
      })
      .addCase(loadProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const selectProducts = (state) => state.products;
export default productsSlice.reducer;