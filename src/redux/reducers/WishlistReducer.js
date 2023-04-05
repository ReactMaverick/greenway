// import {createReducer} from '@reduxjs/toolkit';
// const wishlistDataState = {
//   wishlistData: null,
// };
//  const WishlistReducer = createReducer(wishlistDataState, {
//   setWishlistData: (state, action) => {
//     state.wishlistData = action.payload;
//   },
  
// });
// export default WishlistReducer;
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const WishlistReducer = createSlice({
  name: 'wishlistDetail',
  initialState,
})