import {createReducer} from '@reduxjs/toolkit';
const userDataState = {
  userData: null,
};
 const UserReducer = createReducer(userDataState, {
  setUserData: (state, action) => {
    state.userData = action.payload;
  },
  
});
export default UserReducer;