import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const CartReducer = createSlice({
  name: 'cartDetail',
  initialState,
  reducers: {
    cartDetails: (state, action) => {
      state.value = action.payload;
    },
  },
})
// Action creators are generated for each case reducer function
export const {cartDetails} = CartReducer.actions;

export default CartReducer.reducer;