import {createReducer} from '@reduxjs/toolkit';
const shopNowDataState = {
  shopNowData: 0,
};
 const ShopNowReducer = createReducer(shopNowDataState, {
  setShopNowData: (state, action) => {
    state.shopNowData = action.payload;
  },
  
});
export default ShopNowReducer;