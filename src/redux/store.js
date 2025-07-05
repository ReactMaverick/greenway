import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserReducer from './reducers/UserReducer';
import WishlistReducer from './reducers/WishlistReducer';
import CartReducer from './reducers/CartReducer';
import CouponDetailsReducer from './reducers/CouponDetailsReducer';
import ShopNowReducer from './reducers/ShopNowReducer';
import SelectedShippingAddressReducer from './reducers/SelectedShippingAddressReducer';
import AlertReducer from './reducers/AlertReducer';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistConfig1 = {
  key: 'root1',
  storage: AsyncStorage,
};
const persistConfig2 = {
  key: 'root2',
  storage: AsyncStorage,
};
const persistConfig3 = {
  key: 'root3',
  storage: AsyncStorage,
};
const persistConfig4 = {
  key: 'root4',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({

  UserReducer: persistReducer(persistConfig, UserReducer),
  WishlistReducer: persistReducer(persistConfig1, WishlistReducer),
  CartReducer: persistReducer(persistConfig2, CartReducer),
  CouponDetailsReducer: persistReducer(persistConfig3, CouponDetailsReducer),
  SelectedShippingAddressReducer: persistReducer(persistConfig4, SelectedShippingAddressReducer),


  ShopNowReducer: ShopNowReducer,
  AlertReducer: AlertReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
