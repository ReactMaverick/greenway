import {createReducer} from '@reduxjs/toolkit';
const wishlistDataState = {
  wishlistData: null,
};
 const WishlistReducer = createReducer(wishlistDataState, {
  setWishlistData: (state, action) => {
    state.wishlistData = action.payload;
  },
  
});
export default WishlistReducer;