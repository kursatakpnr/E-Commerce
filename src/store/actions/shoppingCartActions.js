// ShoppingCart Action Creators

import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART
} from './actionTypes';

// ============== SYNC ACTION CREATORS ==============

// Sepeti ayarla
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart
});

// Ödeme bilgisini ayarla
export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment
});

// Adres bilgisini ayarla
export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

// Sepete ürün ekle
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

// Sepetten ürün çıkar
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

// Sepetteki ürün miktarını güncelle
export const updateCartItem = (productId, count) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count }
});

// Sepeti temizle
export const clearCart = () => ({
  type: CLEAR_CART
});
