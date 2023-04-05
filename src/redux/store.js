import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'reduxjs-toolkit-persist';

// import {customReducer} from './reducers/Reducers';
import UserReducer from './reducers/UserReducer';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};


const rootReducer = combineReducers({

  UserReducer: persistReducer(persistConfig, UserReducer),

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
