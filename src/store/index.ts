import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';

import persist from './persist';
import { persistStore } from 'redux-persist';

const store = configureStore({
    reducer: persist(rootReducer),
});

export const persistor = persistStore(store);

export default store;
