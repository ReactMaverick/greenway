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
    }
  },
})
// Action creators are generated for each case reducer function
export const {shopnowDetails} = ShopNowReducer.actions;

export default ShopNowReducer.reducer;