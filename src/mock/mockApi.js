// Mock API Fonksiyonları - Backend kullanılmadan simülasyon için

import { 
  mockRoles, 
  mockUsers, 
  registeredUsers, 
  mockCategories, 
  mockProducts,
  generateMockToken 
} from './data';

// ============== AUTH API ==============

// Rolleri getir
export const fetchRoles = async () => {
  return {
    success: true,
    data: mockRoles
  };
};

// Kullanıcı kaydı
export const signup = async (userData) => {
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
  return {
    success: true,
    data: mockCategories
  };
};

// Ürünleri getir
export const fetchProducts = async (params = {}) => {
  const { limit = 4, offset = 0, filter = '', category = '', sort = '' } = params;

  let filteredProducts = [...mockProducts];

  // Kategori filtresi uygula
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category_id === parseInt(category)
    );
  }

  // Metin filtresi uygula
  if (filter) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Sıralama uygula
  if (sort) {
    const [field, order] = sort.split(':');
    filteredProducts.sort((a, b) => {
      if (field === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (field === 'rating') {
        return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });
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
