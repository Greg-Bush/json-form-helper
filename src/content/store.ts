import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import rootReducer from './reducer';

const store = createStore(
    rootReducer,
    applyMiddleware(
        // @ts-ignore
        logger
    )
)

export default store
