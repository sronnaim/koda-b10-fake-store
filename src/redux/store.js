import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { storage } from "./storages/localStorage.storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import productsReducer from './slices/products.slice'
import cartReducer from './slices/cart.slice'

const persistAppConfig = {
  key: 'app',
  storage
}

const appReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
})

export const store = configureStore({
  reducer: persistReducer(persistAppConfig, appReducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export const persistor = persistStore(store)