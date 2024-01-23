import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducer';
import storage from 'redux-persist/lib/storage';

const persistedReducer = persistReducer({
    key: 'root',
    storage: storage
}, rootReducer)

const store = createStore(
    // @ts-ignore
    persistedReducer,
    applyMiddleware(
        // @ts-ignore
        logger
    )
)

export const persistor = persistStore(store)

export default store
