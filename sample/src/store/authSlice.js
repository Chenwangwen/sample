import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const restoreToken = createAsyncThunk('auth/restoreToken', async () => {
  const token = await AsyncStorage.getItem('userToken');
  return token ? { token } : null;
});

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }) => {
  const response = await axios.post('http://10.0.2.2:3000/users/signin', {
    email,
    password,
  });
  const token = response.data.token;
  await AsyncStorage.setItem('userToken', token);
  return { token };
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await AsyncStorage.removeItem('userToken');
  return {};
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, token: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(restoreToken.fulfilled, (state, action) => {
        state.token = action.payload?.token || null;
        state.isLoggedIn = !!action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
