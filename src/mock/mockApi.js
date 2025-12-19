// Mock API Fonksiyonları - Backend kullanılmadan simülasyon için

import { 
  mockRoles, 
  mockUsers, 
  registeredUsers, 
  mockCategories, 
  mockProducts,
  generateMockToken,
  mockAddresses,
  turkishCities,
  mockCreditCards
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

// ============== ADDRESS API ==============

// Türkiye illerini getir
export const getCities = () => {
  return turkishCities;
};

// Kullanıcının adreslerini getir
export const fetchAddresses = async (userId) => {
  const addresses = mockAddresses.filter(a => a.user_id === userId);
  return {
    success: true,
    data: addresses
  };
};

// Yeni adres ekle
export const addAddress = async (addressData) => {
  const newAddress = {
    id: mockAddresses.length > 0 ? Math.max(...mockAddresses.map(a => a.id)) + 1 : 1,
    ...addressData
  };
  mockAddresses.push(newAddress);
  return {
    success: true,
    data: newAddress
  };
};

// Adres güncelle
export const updateAddress = async (addressId, addressData) => {
  const index = mockAddresses.findIndex(a => a.id === addressId);
  if (index === -1) {
    return {
      success: false,
      error: 'Address not found'
    };
  }
  mockAddresses[index] = { ...mockAddresses[index], ...addressData };
  return {
    success: true,
    data: mockAddresses[index]
  };
};

// Adres sil
export const deleteAddress = async (addressId) => {
  const index = mockAddresses.findIndex(a => a.id === addressId);
  if (index === -1) {
    return {
      success: false,
      error: 'Address not found'
    };
  }
  mockAddresses.splice(index, 1);
  return {
    success: true,
    message: 'Address deleted successfully'
  };
};

// ============== CREDIT CARD API ==============

// Kullanıcının kartlarını getir
export const fetchCreditCards = async (userId) => {
  const cards = mockCreditCards.filter(c => c.user_id === userId);
  return {
    success: true,
    data: cards
  };
};

// Yeni kart ekle
export const addCreditCard = async (cardData) => {
  const newCard = {
    id: mockCreditCards.length > 0 ? Math.max(...mockCreditCards.map(c => c.id)) + 1 : 1,
    ...cardData,
    card_no: '**** **** **** ' + cardData.card_no.slice(-4)
  };
  mockCreditCards.push(newCard);
  return {
    success: true,
    data: newCard
  };
};

// Kart güncelle
export const updateCreditCard = async (cardId, cardData) => {
  const index = mockCreditCards.findIndex(c => c.id === cardId);
  if (index === -1) {
    return {
      success: false,
      error: 'Card not found'
    };
  }
  mockCreditCards[index] = { ...mockCreditCards[index], ...cardData };
  return {
    success: true,
    data: mockCreditCards[index]
  };
};

// Kart sil
export const deleteCreditCard = async (cardId) => {
  const index = mockCreditCards.findIndex(c => c.id === cardId);
  if (index === -1) {
    return {
      success: false,
      error: 'Card not found'
    };
  }
  mockCreditCards.splice(index, 1);
  return {
    success: true,
    message: 'Card deleted successfully'
  };
};
