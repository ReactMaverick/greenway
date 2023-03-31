import { createReducer } from '@reduxjs/toolkit';
import DeviceInfo from 'react-native-device-info';

const generateId = async() =>  {
  sessionId = null;
  DeviceInfo.getAndroidId().then((androidId) => {
    sessionId = androidId;
  });
  return sessionId;
}
const sessionIdState = {
  sessionId: generateId(),
};
const SessionIdReducer = createReducer(sessionIdState, {
  setSessionId: (state, action) => {
    state.sessionId = action.payload;
  },

});
export default SessionIdReducer;