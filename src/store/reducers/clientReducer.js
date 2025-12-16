// Client Reducer

import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  LOGOUT
} from '../actions/actionTypes';

// Initial State
const initialState = {
  user: null,           // {Object} kullanıcı bilgileri
  addressList: [],      // {Object Array} kullanıcının adres listesi
  creditCards: [],      // {Object Array} kullanıcının kredi kartları
  roles: [],            // {Object Array} roller
  theme: 'light',       // {String} tema
  language: 'tr'        // {String} dil
};

// Reducer
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };

    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };

    case SET_ADDRESS_LIST:
      return {
        ...state,
        addressList: action.payload
      };

    case SET_CREDIT_CARDS:
      return {
        ...state,
        creditCards: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        addressList: [],
        creditCards: []
      };

    default:
      return state;
  }
};

export default clientReducer;
