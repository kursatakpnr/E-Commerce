// Product Reducer

import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_SORT,
  SET_CATEGORY,
  SET_CURRENT_PRODUCT
} from '../actions/actionTypes';

// Initial State
const initialState = {
  categories: [],           // {Object Array} kategoriler
  productList: [],          // {Object Array} ürün listesi
  currentProduct: null,     // {Object} şu an görüntülenen ürün
  total: 0,                 // {Number} toplam ürün sayısı
  limit: 4,                 // {Number} sayfa başına ürün sayısı (varsayılan: 4)
  offset: 0,                // {Number} pagination için offset (varsayılan: 0)
  filter: '',               // {String} filtre
  sort: '',                 // {String} sıralama: price:asc, price:desc, rating:asc, rating:desc
  category: '',             // {String|Number} kategori id
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

    case SET_SORT:
      return {
        ...state,
        sort: action.payload
      };

    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };

    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload
      };

    default:
      return state;
  }
};

export default productReducer;
