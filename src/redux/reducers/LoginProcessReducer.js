import {createReducer} from '@reduxjs/toolkit';
const loginProcess = {
  loginProcessData: null,
};
 const LoginProcessReducer = createReducer(loginProcess, {
  setLoginProcess: (state, action) => {
    state.loginProcessData = action.payload;
  },
  
});
export default LoginProcessReducer;