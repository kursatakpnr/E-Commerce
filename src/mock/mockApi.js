// Mock API Fonksiyonları - Backend kullanılmadan simülasyon için

import { 
  mockRoles, 
  mockUsers, 
  registeredUsers, 
  mockCategories, 
  mockProducts,
  generateMockToken 
} from './data';

// Simüle edilmiş gecikme (gerçek API gibi davranması için)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============== AUTH API ==============

// Rolleri getir
export const fetchRoles = async () => {
  await delay(500); // 500ms gecikme simülasyonu
  return {
    success: true,
    data: mockRoles
  };
};

// Kullanıcı kaydı
export const signup = async (userData) => {
  await delay(1000); // 1 saniye gecikme simülasyonu

  // Email kontrolü
  const existingUser = registeredUsers.find(u => u.email === userData.email);
  if (existingUser) {
    return {
      success: false,
      error: 'This email is already registered'
    };
  }

  // Yeni kullanıcı oluştur
  const newUser = {
    id: registeredUsers.length + 1,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role_id: userData.role_id,
    role: mockRoles.find(r => r.id === userData.role_id)?.code || 'customer'
  };

  // Store rolü ise store bilgilerini ekle
  if (userData.store) {
    newUser.store = userData.store;
  }

  // Kullanıcıyı listeye ekle
  registeredUsers.push(newUser);

  return {
    success: true,
    message: 'You need to click link in email to activate your account!'
  };
};

// Kullanıcı girişi
export const login = async (email, password) => {
  await delay(800); // 800ms gecikme simülasyonu

  // Kullanıcıyı bul
  const user = registeredUsers.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }

  // Token oluştur
  const token = generateMockToken(user.id);

  // Şifreyi response'dan çıkar
  const { password: _, ...userWithoutPassword } = user;

  return {
    success: true,
    token,
    user: userWithoutPassword
  };
};

// Token doğrulama - /verify endpoint simülasyonu
export const verifyToken = async (token) => {
  await delay(300);

  // Mock token kontrolü
  if (token && token.startsWith('mock-jwt-token-')) {
    const userId = parseInt(token.split('-')[3]);
    const user = registeredUsers.find(u => u.id === userId);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      // Yeni token oluştur (token yenileme)
      const newToken = generateMockToken(user.id);
      
      return {
        success: true,
        user: userWithoutPassword,
        token: newToken // Yenilenmiş token döndür
      };
    }
  }

  return {
    success: false,
    error: 'Invalid or expired token'
  };
};

// ============== PRODUCT API ==============

// Kategorileri getir
export const fetchCategories = async () => {
  await delay(400);
  return {
    success: true,
    data: mockCategories
  };
};

// Ürünleri getir
export const fetchProducts = async (params = {}) => {
  await delay(600);

  const { limit = 25, offset = 0, filter = '' } = params;

  let filteredProducts = [...mockProducts];

  // Filtre uygula
  if (filter) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Pagination
  const paginatedProducts = filteredProducts.slice(offset, offset + limit);

  return {
    success: true,
    data: {
      products: paginatedProducts,
      total: filteredProducts.length
    }
  };
};

// Tek ürün getir
export const fetchProductById = async (id) => {
  await delay(400);

  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return {
      success: false,
      error: 'Product not found'
    };
  }

  return {
    success: true,
    data: product
  };
};
