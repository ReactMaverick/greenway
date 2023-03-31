import {createReducer} from '@reduxjs/toolkit';
const selectedShippingAddressState = {
  selectedShippingAddress: null,
};
 const SelectedShippingAddressReducer = createReducer(selectedShippingAddressState, {
  setSelectedShippingAddressData: (state, action) => {
    state.selectedShippingAddress = action.payload;
  },
  
});
export default SelectedShippingAddressReducer;