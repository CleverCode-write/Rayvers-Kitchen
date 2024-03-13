import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import appSlice from './Splice/AppSplice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    // 'token',
    // 'userType',
    'carts',
    'address',
    'userId',
    'userInfo',
    'userProfile',
    'userAddress',
    'restaurants',
    'dishes',
    'restaurants',
    'availableCards',
    'name',
    'email',
    'chats'
  ],
};

const rootReducer = combineReducers({
  data: persistReducer(persistConfig, appSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
