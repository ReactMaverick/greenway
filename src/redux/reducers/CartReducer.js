import {createReducer} from '@reduxjs/toolkit';
const cartDataState = {
  cartData: null,
};
 const CartReducer = createReducer(cartDataState, {
  setCartData: (state, action) => {
    state.cartData = action.payload;
  },
  
});
export default CartReducer;