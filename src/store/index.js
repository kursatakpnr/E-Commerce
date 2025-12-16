// Redux Store Konfigürasyonu

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

// Middleware'leri uygula (sadece thunk - production-ready)
const middlewares = [thunk];

// Store oluştur
const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;
