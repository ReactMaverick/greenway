import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const CouponDetailsReducer = createSlice({
  name: 'couponDetail',
  initialState,
  reducers: {
    couponData: (state, action) => {
      state.value = action.payload;
    },
    logOut: state => {
      state.value = null;
    },
  },
})
// Action creators are generated for each case reducer function
export const {couponData, logOut} = CouponDetailsReducer.actions;

export default CouponDetailsReducer.reducer;