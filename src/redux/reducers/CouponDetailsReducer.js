import {createReducer} from '@reduxjs/toolkit';
const couponDetailsState = {
  couponDetails: null,
};
 const CouponDetailsReducer = createReducer(couponDetailsState, {
  setCouponDetails: (state, action) => {
    state.couponDetails = action.payload;
  },
  
});
export default CouponDetailsReducer;