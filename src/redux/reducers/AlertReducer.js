// import { createReducer } from '@reduxjs/toolkit';
// const alertState = {
//   alertStatus: false,
//   alertType: "success",
//   alertTitle: "This is a alert"

// };
// const AlertReducer = createReducer(alertState, {
//   setAlertState: (state, action) => {
//     state.alertStatus = action.payload.alertStatus;
//     state.alertType = action.payload.alertType;
//     state.alertTitle = action.payload.alertTitle;
//   },
//   setAlertStatus: (state, action) => {
//     state.alertStatus = action.payload;
//   },

// });
// export default AlertReducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alertStatus: false,
  alertType: "success",
  alertTitle: "This is a alert"
};

export const AlertReducer = createSlice({
  name: 'alertDetail',
  initialState,
  reducers: {
    alertDetails: (state, action) => {
      // state.value = action.payload;
      state.alertStatus = action.payload;
      state.alertType = action.payload;
      state.alertTitle = action.payload;
    },
    logOut: state => {
      state.value = null;
    },
  },
})
// Action creators are generated for each case reducer function
export const { alertDetails, logOut } = AlertReducer.actions;

export default AlertReducer.reducer;