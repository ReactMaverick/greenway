import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'reduxjs-toolkit-persist';

import UserReducer from './reducers/UserReducer';
import WishlistReducer from './reducers/WishlistReducer';
import LoginProcessReducer from './reducers/LoginProcessReducer';
import AlertReducer from './reducers/AlertReducer';
import CartReducer from './reducers/CartReducer';
import CouponDetailsReducer from './reducers/CouponDetailsReducer';
import SelectedShippingAddressReducer from './reducers/SelectedShippingAddressReducer';
import ShopNowReducer from './reducers/ShopNowReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistConfig1 = {
  key: 'root1',
  storage: AsyncStorage,
}
// const persistConfig2 = {
//   key: 'root2',
//   storage: AsyncStorage,
// }
const persistConfig3 = {
  key: 'root3',
  storage: AsyncStorage,
}
const persistConfig4 = {
  key: 'root4',
  storage: AsyncStorage,
}
const persistConfig5 = {
  key: 'root5',
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
  UserReducer: persistReducer(persistConfig, UserReducer),
  WishlistReducer: persistReducer(persistConfig1, WishlistReducer),
  CartReducer: persistReducer(persistConfig3, CartReducer),
  CouponDetailsReducer: persistReducer(persistConfig4, CouponDetailsReducer),
  SelectedShippingAddressReducer: persistReducer(persistConfig5, SelectedShippingAddressReducer),

  LoginProcessReducer: LoginProcessReducer,
  AlertReducer: AlertReducer,
  ShopNowReducer: ShopNowReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
