// ShoppingCart Reducer

import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  TOGGLE_CART_ITEM,
  CLEAR_CART
} from '../actions/actionTypes';

// Initial State
const initialState = {
  cart: [],       // {Object Array} sepetteki ürünler: [{ count: 1, product: { id: "1235", ... } }]
  payment: null,  // {Object} ödeme bilgisi
  address: null   // {Object} adres bilgisi
};

// Reducer
const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };

    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        item => item.product.id === action.payload.id
      );

      if (existingItem) {
        // Ürün zaten sepette, miktarı artır
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, count: item.count + 1 }
              : item
          )
        };
      }

      // Yeni ürün ekle
      return {
        ...state,
        cart: [...state.cart, { count: 1, checked: true, product: action.payload }]
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };

    case UPDATE_CART_ITEM: {
      const { productId, count } = action.payload;
      
      if (count <= 0) {
        // Miktar 0 veya altındaysa ürünü kaldır
        return {
          ...state,
          cart: state.cart.filter(item => item.product.id !== productId)
        };
      }

      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === productId
            ? { ...item, count }
            : item
        )
      };
    }

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        )
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        payment: null,
        address: null
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;
