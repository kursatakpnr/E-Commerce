// Product Action Creators

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
} from './actionTypes';

import { 
  fetchCategories as fetchCategoriesApi, 
  fetchProducts as fetchProductsApi,
  fetchProductById as fetchProductByIdApi
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

// Sıralama ayarla
export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort
});

// Kategori ayarla
export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category
});

// Şu anki ürünü ayarla
export const setCurrentProduct = (product) => ({
  type: SET_CURRENT_PRODUCT,
  payload: product
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

// Ürünleri getir - category, filter, sort, offset parametreleri ile
export const fetchProducts = (params = {}) => async (dispatch, getState) => {
  const { product } = getState();
  const { limit, offset, filter, sort, category } = product;

  // Parametreleri birleştir (state + gelen params)
  const queryParams = {
    limit: params.limit !== undefined ? params.limit : limit,
    offset: params.offset !== undefined ? params.offset : offset,
    filter: params.filter !== undefined ? params.filter : filter,
    sort: params.sort !== undefined ? params.sort : sort,
    category: params.category !== undefined ? params.category : category
  };

  dispatch(setFetchState(FETCH_STATES.FETCHING));

  try {
    const response = await fetchProductsApi(queryParams);
    
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

// Tek ürün getir - /products/:productId
export const fetchProductById = (productId) => async (dispatch) => {
  dispatch(setFetchState(FETCH_STATES.FETCHING));
  dispatch(setCurrentProduct(null)); // Önceki ürünü temizle

  try {
    const response = await fetchProductByIdApi(productId);
    
    if (response.success) {
      dispatch(setCurrentProduct(response.data));
      dispatch(setFetchState(FETCH_STATES.FETCHED));
      return response.data;
    }
    
    throw new Error('Failed to fetch product');
  } catch (error) {
    console.error('Error fetching product:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
    throw error;
  }
};
