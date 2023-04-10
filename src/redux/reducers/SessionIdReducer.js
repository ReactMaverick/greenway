import { createSlice } from '@reduxjs/toolkit';
import DeviceInfo from 'react-native-device-info';

const generateId = async () => {
  sessionId = null;
  DeviceInfo.getAndroidId().then((androidId) => {
    sessionId = androidId;
  });
  return sessionId;
}
const initialState = {
  value: generateId(),
};

export const SessionIdReducer = createSlice({
  name: 'sessionDetail',
  initialState,
  reducers: {
    sessionDetails: (state, action) => {
      state.value = action.payload;
    },
    logOut: state => {
      state.value = null;
    },
  },
})
// Action creators are generated for each case reducer function
export const { sessionDetails, logOut } = SessionIdReducer.actions;

export default SessionIdReducer.reducer;