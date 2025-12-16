// Mock Data - Backend kullanılmadan simülasyon için

// Roller
export const mockRoles = [
  { id: 1, code: 'customer', name: 'Customer' },
  { id: 2, code: 'store', name: 'Store' },
  { id: 3, code: 'admin', name: 'Admin' }
];

// Test Kullanıcıları
export const mockUsers = [
  {
    id: 1,
    name: 'Test Customer',
    email: 'customer@commerce.com',
    password: '123456',
    role_id: 1,
    role: 'customer'
  },
  {
    id: 2,
    name: 'Test Store Owner',
    email: 'store@commerce.com',
    password: '123456',
    role_id: 2,
    role: 'store',
    store: {
      name: 'Demo Store',
      phone: '+905551234567',
      tax_no: 'T1234V567890',
      bank_account: 'TR330006100519786457841326'
    }
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@commerce.com',
    password: '123456',
    role_id: 3,
    role: 'admin'
  }
];

// Kayıtlı kullanıcılar listesi (yeni kayıtlar buraya eklenir)
export let registeredUsers = [...mockUsers];

// Mock Categories - Yemek/Market Kategorileri
export const mockCategories = [
  // Taze Gıda Kategorileri
  { id: 1, code: 'meyve-sebze', title: 'Meyve & Sebze', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=400&fit=crop', rating: 4.9, category_type: 'taze', product_count: 85 },
  { id: 2, code: 'et-tavuk', title: 'Et & Tavuk', img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=400&fit=crop', rating: 4.85, category_type: 'taze', product_count: 45 },
  { id: 3, code: 'sut-urunleri', title: 'Süt Ürünleri', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=400&fit=crop', rating: 4.8, category_type: 'taze', product_count: 62 },
  { id: 4, code: 'firin', title: 'Fırın & Unlu Mamul', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=400&fit=crop', rating: 4.75, category_type: 'taze', product_count: 38 },
  { id: 5, code: 'deniz-urunleri', title: 'Deniz Ürünleri', img: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=300&h=400&fit=crop', rating: 4.7, category_type: 'taze', product_count: 28 },
  { id: 6, code: 'sarkuteri', title: 'Şarküteri', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=400&fit=crop', rating: 4.65, category_type: 'taze', product_count: 34 },
  
  // Paketli Gıda Kategorileri
  { id: 7, code: 'icecekler', title: 'İçecekler', img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=300&h=400&fit=crop', rating: 4.6, category_type: 'paketli', product_count: 95 },
  { id: 8, code: 'atistirmalik', title: 'Atıştırmalıklar', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=400&fit=crop', rating: 4.55, category_type: 'paketli', product_count: 72 },
  { id: 9, code: 'kahvaltilik', title: 'Kahvaltılıklar', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=400&fit=crop', rating: 4.5, category_type: 'paketli', product_count: 56 },
  { id: 10, code: 'dondurulmus', title: 'Dondurulmuş Gıda', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=400&fit=crop', rating: 4.45, category_type: 'paketli', product_count: 48 },
  { id: 11, code: 'temel-gida', title: 'Temel Gıda', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=400&fit=crop', rating: 4.4, category_type: 'paketli', product_count: 67 },
  { id: 12, code: 'temizlik', title: 'Temizlik & Kişisel Bakım', img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=400&fit=crop', rating: 4.35, category_type: 'ev', product_count: 89 }
];

// Mock Products
export const mockProducts = [
  {
    id: 1,
    name: 'Premium T-Shirt',
    description: 'High quality cotton t-shirt',
    price: 49.99,
    stock: 100,
    store_id: 1,
    category_id: 1,
    rating: 4.5,
    sell_count: 250,
    images: [{ url: '/images/products/tshirt.jpg' }]
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    description: 'Bluetooth 5.0 wireless headphones',
    price: 129.99,
    stock: 50,
    store_id: 1,
    category_id: 2,
    rating: 4.8,
    sell_count: 180,
    images: [{ url: '/images/products/headphones.jpg' }]
  },
  {
    id: 3,
    name: 'Leather Watch',
    description: 'Classic leather strap watch',
    price: 89.99,
    stock: 30,
    store_id: 1,
    category_id: 3,
    rating: 4.3,
    sell_count: 120,
    images: [{ url: '/images/products/watch.jpg' }]
  },
  {
    id: 4,
    name: 'Running Shoes',
    description: 'Comfortable running shoes',
    price: 119.99,
    stock: 75,
    store_id: 1,
    category_id: 4,
    rating: 4.7,
    sell_count: 300,
    images: [{ url: '/images/products/shoes.jpg' }]
  }
];

// Mock token generator
export const generateMockToken = (userId) => {
  return `mock-jwt-token-${userId}-${Date.now()}`;
};
