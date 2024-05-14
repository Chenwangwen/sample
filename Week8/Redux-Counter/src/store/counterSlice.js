import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increment: state => {
            state.count += 1;
        },
        decrement: state => {
            state.count -= 1;
        },
        incrementByValue: (state, action) => {
            state.count += action.payload;
        }
    }
});

export const { increment, decrement, incrementByValue } = counterSlice.actions;
export const incrementAsync = (amount) => dispatch => {
    setTimeout(() => {
        dispatch(incrementByValue(amount));
    }, 1000);
};
export const selectCount = state => state.counter.count;
export default counterSlice.reducer;