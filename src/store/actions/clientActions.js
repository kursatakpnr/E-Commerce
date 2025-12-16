// Client Action Creators

import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  LOGOUT
} from './actionTypes';

import { fetchRoles as fetchRolesApi, login as loginApi, verifyToken } from '../../mock/mockApi';
import { setAuthToken, clearAuthToken, initializeAuthToken } from '../../api/axiosInstance';

// ============== SYNC ACTION CREATORS ==============

// Kullanıcıyı ayarla
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

// Rolleri ayarla
export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

// Temayı ayarla
export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

// Dili ayarla
export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

// Adres listesini ayarla
export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList
});

// Kredi kartlarını ayarla
export const setCreditCards = (creditCards) => ({
  type: SET_CREDIT_CARDS,
  payload: creditCards
});

// Çıkış yap
export const logout = () => {
  // Token'ı localStorage ve axios header'dan sil
  clearAuthToken();
  return {
    type: LOGOUT
  };
};

// ============== THUNK ACTION CREATORS ==============

// Rolleri getir (sadece gerektiğinde çağrılır)
export const fetchRoles = () => async (dispatch, getState) => {
  // Roller zaten yüklenmişse tekrar çekme
  const { client } = getState();
  if (client.roles && client.roles.length > 0) {
    return client.roles;
  }

  try {
    const response = await fetchRolesApi();
    if (response.success) {
      dispatch(setRoles(response.data));
      return response.data;
    }
    throw new Error('Failed to fetch roles');
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

// Kullanıcı girişi
export const loginUser = (email, password, rememberMe = false) => async (dispatch) => {
  try {
    const response = await loginApi(email, password);
    
    if (response.success) {
      dispatch(setUser(response.user));
      
      // Remember me işaretliyse token'ı localStorage ve axios header'a kaydet
      if (rememberMe) {
        setAuthToken(response.token);
      }
      
      return { success: true, user: response.user, token: response.token };
    }
    
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
};

// Token ile otomatik giriş (sayfa yenilendiğinde)
// Uygulama başlangıcında çağrılmalı
export const autoLogin = () => async (dispatch) => {
  // 1. localStorage'da token var mı kontrol et
  const token = initializeAuthToken();
  
  if (!token) {
    return { success: false };
  }

  try {
    // 2. Token'ı axios header'a ekle (initializeAuthToken zaten ekledi)
    // 3. /verify endpoint'ine GET request yap (mock)
    const response = await verifyToken(token);
    
    if (response.success) {
      // 4. Token geçerliyse:
      // - User bilgisini Redux'a kaydet
      dispatch(setUser(response.user));
      
      // - Yeni token'ı localStorage ve axios header'a kaydet
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return { success: true, user: response.user };
    }
    
    clearAuthToken();
    return { success: false };
  } catch (error) {
    console.error('Auto login error:', error);
    clearAuthToken();
    return { success: false };
  }
};
