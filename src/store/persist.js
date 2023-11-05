import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const persistedReducers = (reducers) => persistReducer(
    {
      key: 'OUV',
      storage,
    },
    reducers,
  );


export default persistedReducers
