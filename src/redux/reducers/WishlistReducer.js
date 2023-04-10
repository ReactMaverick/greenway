import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const WishlistReducer = createSlice({
  name: 'wishlistDetail',
  initialState,
  reducers: {
    wishlistDetails: (state, action) => {
      state.value = action.payload;
    },
    logOut: state => {
      state.value = null;
    },
  },
})
// Action creators are generated for each case reducer function
export const {wishlistDetails, logOut} = WishlistReducer.actions;

export default WishlistReducer.reducer;