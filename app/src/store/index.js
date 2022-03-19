import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import userSlice from "./slice/userSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'



const persistConfig={
    key: 'root',
    version: 1,
    storage,
    
}

export const reducers = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 

    getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})


