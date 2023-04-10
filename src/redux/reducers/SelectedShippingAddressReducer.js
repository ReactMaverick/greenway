import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const SelectedShippingAddressReducer = createSlice({
  name: 'selectedShippingAddressDetail',
  initialState,
  reducers: {
    selectedShippingAddressDetails: (state, action) => {
      state.value = action.payload;
    },
    logOut: state => {
      state.value = null;
    },
  },
})
// Action creators are generated for each case reducer function
export const {selectedShippingAddressDetails, logOut} = SelectedShippingAddressReducer.actions;

export default SelectedShippingAddressReducer.reducer;