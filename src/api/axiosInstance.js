import axios from 'axios';

// Axios instance oluşturma
// NOT: Bu projede gerçek API kullanılmıyor, mock fonksiyonlar kullanılıyor
const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token'ı axios header'a ekle (Bearer prefix YOK!)
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Token'ı axios header'dan ve localStorage'dan sil
export const clearAuthToken = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
  localStorage.removeItem('token');
};

// localStorage'dan token'ı oku ve header'a ekle
export const initializeAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token;
    return token;
  }
  return null;
};

// Request interceptor - her istekte token ekle
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // NOT: Bearer prefix eklenmeden direkt token gönderiliyor
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      // Gerekirse login sayfasına yönlendir
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
