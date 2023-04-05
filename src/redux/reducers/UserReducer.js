import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const UserReducer = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.value = action.payload;
    },
    updateImage: (state, action) => {
     
      let temp = state.value;
      temp.user.image = action.payload
       state.value = temp;
    },
    logOut: state => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {userDetails, logOut,updateImage} = UserReducer.actions;

export default UserReducer.reducer;