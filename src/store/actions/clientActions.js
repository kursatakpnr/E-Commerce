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
import { 
  fetchAddresses as fetchAddressesApi, 
  addAddress as addAddressApi, 
  updateAddress as updateAddressApi, 
  deleteAddress as deleteAddressApi,
  fetchCreditCards as fetchCreditCardsApi,
  addCreditCard as addCreditCardApi,
  updateCreditCard as updateCreditCardApi,
  deleteCreditCard as deleteCreditCardApi
} from '../../mock/mockApi';
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

// ============== ADDRESS THUNK ACTIONS ==============

// Adresleri getir
export const fetchAddresses = () => async (dispatch, getState) => {
  const { client } = getState();
  if (!client.user) {
    return { success: false, error: 'User not logged in' };
  }

  try {
    const response = await fetchAddressesApi(client.user.id);
    if (response.success) {
      dispatch(setAddressList(response.data));
      return { success: true, data: response.data };
    }
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return { success: false, error: 'An error occurred' };
  }
};

// Yeni adres ekle
export const addAddressAction = (addressData) => async (dispatch, getState) => {
  const { client } = getState();
  if (!client.user) {
    return { success: false, error: 'User not logged in' };
  }

  try {
    const response = await addAddressApi({ ...addressData, user_id: client.user.id });
    if (response.success) {
      // Listeyi güncelle
      dispatch(setAddressList([...client.addressList, response.data]));
      return { success: true, data: response.data };
    }
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Error adding address:', error);
    return { success: false, error: 'An error occurred' };
  }
};

// Adres güncelle
export const updateAddressAction = (addressId, addressData) => async (dispatch, getState) => {
  const { client } = getState();
  
  try {
    const response = await updateAddressApi(addressId, addressData);
    if (response.success) {
      // Listeyi güncelle
      const updatedList = client.addressList.map(addr => 
        addr.id === addressId ? response.data : addr
      );
      dispatch(setAddressList(updatedList));
      return { success: true, data: response.data };
    }
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Error updating address:', error);
    return { success: false, error: 'An error occurred' };
  }
};

// Adres sil
export const deleteAddressAction = (addressId) => async (dispatch, getState) => {
  const { client } = getState();
  
  try {
    const response = await deleteAddressApi(addressId);
    if (response.success) {
      // Listeden kaldır
      const updatedList = client.addressList.filter(addr => addr.id !== addressId);
      dispatch(setAddressList(updatedList));
      return { success: true };
    }
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Error deleting address:', error);
    return { success: false, error: 'An error occurred' };
  }
};

// ============== CREDIT CARD THUNK ACTIONS ==============

// Kartları getir
export const fetchCreditCards = () => async (dispatch, getState) => {
  const { client } = getState();
  if (!client.user) {
    return { success: false, error: 'User not logged in' };
  }

  try {
    const response = await fetchCreditCardsApi(client.user.id);
    if (response.success) {
      dispatch(setCreditCards(response.data));
      return { success: true, data: response.data };
    }
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Error fetching credit cards:', error);
    return { success: false, error: 'An error occurred' };
  }
};

// Yeni kart ekle
export const addCreditCardAction = (cardData) => async (dispatch, getState) => {
  const { client } = getState();
  if (!client.user) {
    return { success: false, error: 'User not logged in' };
  }

  try {
    const response = await addCreditCardApi({ ...cardData, user_id: client.user.id });
    if (response.success) {
      dispatch(setCreditCards([...client.creditCards, response.data]));
      return { success: true, data: response.data };
    }
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Error adding credit card:', error);
    return { success: false, error: 'An error occurred' };
  }
};

// Kart güncelle
export const updateCreditCardAction = (cardId, cardData) => async (dispatch, getState) => {
  const { client } = getState();
  
  try {
    const response = await updateCreditCardApi(cardId, cardData);
    if (response.success) {
      const updatedList = client.creditCards.map(card => 
        card.id === cardId ? response.data : card
      );
      dispatch(setCreditCards(updatedList));
      return { success: true, data: response.data };
    }
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Error updating credit card:', error);
    return { success: false, error: 'An error occurred' };
  }
};

// Kart sil
export const deleteCreditCardAction = (cardId) => async (dispatch, getState) => {
  const { client } = getState();
  
  try {
    const response = await deleteCreditCardApi(cardId);
    if (response.success) {
      const updatedList = client.creditCards.filter(card => card.id !== cardId);
      dispatch(setCreditCards(updatedList));
      return { success: true };
    }
    return { success: false, error: response.error };
  } catch (error) {
    console.error('Error deleting credit card:', error);
    return { success: false, error: 'An error occurred' };
  }
};
