import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const ShopNowReducer = createSlice({
  name: 'shopnowDetail',
  initialState,
  reducers: {
    shopnowDetails: (state, action) => {
      state.value = action.payload;
    },
    logOut: state => {
      state.value = null;
    },
  },
})
// Action creators are generated for each case reducer function
export const {shopnowDetails, logOut} = ShopNowReducer.actions;

export default ShopNowReducer.reducer;