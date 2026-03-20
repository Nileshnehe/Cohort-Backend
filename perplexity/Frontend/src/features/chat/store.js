import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import chatReducer from './chat.slice'
import authReducer from '../../features/auth/auth.slice'  // ← path confirm karo

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['chat']
}

const persistedReducer = persistReducer(persistConfig, chatReducer)

export const store = configureStore({
  reducer: {
    chat: persistedReducer,
    auth: authReducer,  // ← add kiya
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)