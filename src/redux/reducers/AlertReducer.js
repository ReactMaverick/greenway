import {createReducer} from '@reduxjs/toolkit';
const alertState = {
  alertStatus: false,
  alertType: "success",
  alertTitle: "This is a alert"

};
 const AlertReducer = createReducer(alertState, {
  setAlertState: (state, action) => {
    state.alertStatus = action.payload.alertStatus;
    state.alertType = action.payload.alertType;
    state.alertTitle = action.payload.alertTitle;
  },
  setAlertStatus: (state, action) => {
    state.alertStatus = action.payload;
  },
  
});
export default AlertReducer;