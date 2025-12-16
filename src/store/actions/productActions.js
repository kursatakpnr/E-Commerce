// Product Action Creators

import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER
} from './actionTypes';

import { 
  fetchCategories as fetchCategoriesApi, 
  fetchProducts as fetchProductsApi 
} from '../../mock/mockApi';

// Fetch State sabitleri
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED'
};

// ============== SYNC ACTION CREATORS ==============

// Kategorileri ayarla
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

// Ürün listesini ayarla
export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products
});

// Toplam ürün sayısını ayarla
export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

// Fetch durumunu ayarla
export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state
});

// Limit ayarla
export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

// Offset ayarla
export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset
});

// Filtre ayarla
export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

// ============== THUNK ACTION CREATORS ==============

// Kategorileri getir
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await fetchCategoriesApi();
    if (response.success) {
      dispatch(setCategories(response.data));
      return response.data;
    }
    throw new Error('Failed to fetch categories');
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Ürünleri getir
export const fetchProducts = () => async (dispatch, getState) => {
  const { product } = getState();
  const { limit, offset, filter } = product;

  dispatch(setFetchState(FETCH_STATES.FETCHING));

  try {
    const response = await fetchProductsApi({ limit, offset, filter });
    
    if (response.success) {
      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
      dispatch(setFetchState(FETCH_STATES.FETCHED));
      return response.data;
    }
    
    throw new Error('Failed to fetch products');
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
    throw error;
  }
};
