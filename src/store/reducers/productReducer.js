// Product Reducer

import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER
} from '../actions/actionTypes';

// Initial State
const initialState = {
  categories: [],           // {Object Array} kategoriler
  productList: [],          // {Object Array} ürün listesi
  total: 0,                 // {Number} toplam ürün sayısı
  limit: 25,                // {Number} sayfa başına ürün sayısı (varsayılan: 25)
  offset: 0,                // {Number} pagination için offset (varsayılan: 0)
  filter: '',               // {String} filtre
  fetchState: 'NOT_FETCHED' // {String} fetch durumu: NOT_FETCHED | FETCHING | FETCHED | FAILED
};

// Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };

    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };

    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };

    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };

    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
};

export default productReducer;
