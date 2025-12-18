// Mock Data - Backend kullanılmadan simülasyon için

// Roller
export const mockRoles = [
  { id: 1, code: 'customer', name: 'Müşteri' },
  { id: 2, code: 'store', name: 'Mağaza' },
  { id: 3, code: 'admin', name: 'Yönetici' }
];

// Test Kullanıcıları
export const mockUsers = [
  {
    id: 1,
    name: 'Test Müşteri',
    email: 'customer@commerce.com',
    password: '123456',
    role_id: 1,
    role: 'customer'
  },
  {
    id: 2,
    name: 'Test Mağaza Sahibi',
    email: 'store@commerce.com',
    password: '123456',
    role_id: 2,
    role: 'store',
    store: {
      name: 'Demo Mağaza',
      phone: '+905551234567',
      tax_no: 'T1234V567890',
      bank_account: 'TR330006100519786457841326'
    }
  },
  {
    id: 3,
    name: 'Yönetici',
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
    name: 'Organik Domates',
    description: 'Taze ve organik üretim domates',
    price: 49.99,
    stock: 100,
    store_id: 1,
    category_id: 1,
    rating: 4.5,
    sell_count: 250,
    images: [{ url: '/src/assets/card-1.jpg' }]
  },
  {
    id: 2,
    name: 'Dana Kıyma',
    description: 'Taze çekilmiş dana kıyma',
    price: 129.99,
    stock: 50,
    store_id: 1,
    category_id: 2,
    rating: 4.8,
    sell_count: 180,
    images: [{ url: '/src/assets/card-2.jpg' }]
  },
  {
    id: 3,
    name: 'Köy Peyniri',
    description: 'Doğal köy peyniri',
    price: 89.99,
    stock: 30,
    store_id: 1,
    category_id: 3,
    rating: 4.3,
    sell_count: 120,
    images: [{ url: '/src/assets/card-3.png' }]
  },
  {
    id: 4,
    name: 'Taze Ekmek',
    description: 'Günlük taze fırın ekmeği',
    price: 19.99,
    stock: 75,
    store_id: 1,
    category_id: 4,
    rating: 4.7,
    sell_count: 300,
    images: [{ url: '/src/assets/best-1.png' }]
  },
  {
    id: 5,
    name: 'Taze Somon Balığı',
    description: 'Günlük taze Norveç somonu',
    price: 189.99,
    stock: 25,
    store_id: 1,
    category_id: 5,
    rating: 4.9,
    sell_count: 95,
    images: [{ url: '/src/assets/best-2.jpg' }]
  },
  {
    id: 6,
    name: 'Pastırma',
    description: 'Geleneksel Kayseri pastırması',
    price: 249.99,
    stock: 40,
    store_id: 1,
    category_id: 6,
    rating: 4.6,
    sell_count: 145,
    images: [{ url: '/src/assets/best-3.jpg' }]
  },
  {
    id: 7,
    name: 'Portakal Suyu',
    description: '%100 doğal sıkılmış portakal suyu',
    price: 34.99,
    stock: 60,
    store_id: 1,
    category_id: 7,
    rating: 4.4,
    sell_count: 320,
    images: [{ url: '/src/assets/best-4.jpg' }]
  },
  {
    id: 8,
    name: 'Cips Paketi',
    description: 'Ev yapımı patates cipsi',
    price: 24.99,
    stock: 150,
    store_id: 1,
    category_id: 8,
    rating: 4.2,
    sell_count: 450,
    images: [{ url: '/src/assets/featured-1.jpg' }]
  },
  {
    id: 9,
    name: 'Bal',
    description: 'Organik çiçek balı',
    price: 149.99,
    stock: 35,
    store_id: 1,
    category_id: 9,
    rating: 4.8,
    sell_count: 210,
    images: [{ url: '/src/assets/featured-2.jpg' }]
  },
  {
    id: 10,
    name: 'Dondurulmuş Pizza',
    description: 'Karışık malzemeli hazır pizza',
    price: 59.99,
    stock: 80,
    store_id: 1,
    category_id: 10,
    rating: 4.1,
    sell_count: 280,
    images: [{ url: '/src/assets/featured-3.jpg' }]
  },
  {
    id: 11,
    name: 'Basmati Pirinç',
    description: 'Premium uzun tane basmati pirinci',
    price: 79.99,
    stock: 100,
    store_id: 1,
    category_id: 11,
    rating: 4.5,
    sell_count: 175,
    images: [{ url: '/src/assets/best-seller-left.jpg' }]
  },
  {
    id: 12,
    name: 'Çamaşır Deterjanı',
    description: 'Konsantre sıvı deterjan 3L',
    price: 119.99,
    stock: 90,
    store_id: 1,
    category_id: 12,
    rating: 4.3,
    sell_count: 390,
    images: [{ url: '/src/assets/best-seller-right.jpg' }]
  },
  {
    id: 13,
    name: 'Organik Salatalık',
    description: 'Taze organik salatalık',
    price: 29.99,
    stock: 120,
    store_id: 1,
    category_id: 1,
    rating: 4.4,
    sell_count: 180,
    images: [{ url: '/src/assets/most-popular-left.jpg' }]
  },
  {
    id: 14,
    name: 'Tavuk Göğsü',
    description: 'Taze tavuk göğsü fileto',
    price: 89.99,
    stock: 70,
    store_id: 1,
    category_id: 2,
    rating: 4.6,
    sell_count: 220,
    images: [{ url: '/src/assets/most-popular-right.jpg' }]
  },
  {
    id: 15,
    name: 'Süt 1L',
    description: 'Günlük taze süt',
    price: 24.99,
    stock: 200,
    store_id: 1,
    category_id: 3,
    rating: 4.5,
    sell_count: 550,
    images: [{ url: '/src/assets/most-popular-left-2.jpg' }]
  },
  {
    id: 16,
    name: 'Poğaça',
    description: 'Taze fırından peynirli poğaça',
    price: 14.99,
    stock: 50,
    store_id: 1,
    category_id: 4,
    rating: 4.7,
    sell_count: 420,
    images: [{ url: '/src/assets/most-popular-right-2.jpg' }]
  },
  {
    id: 17,
    name: 'Karides',
    description: 'Taze jumbo karides',
    price: 219.99,
    stock: 30,
    store_id: 1,
    category_id: 5,
    rating: 4.8,
    sell_count: 85,
    images: [{ url: '/src/assets/card-1.jpg' }]
  },
  {
    id: 18,
    name: 'Sucuk',
    description: 'Geleneksel fermente sucuk',
    price: 159.99,
    stock: 55,
    store_id: 1,
    category_id: 6,
    rating: 4.5,
    sell_count: 310,
    images: [{ url: '/src/assets/card-2.jpg' }]
  },
  {
    id: 19,
    name: 'Maden Suyu',
    description: 'Doğal kaynak maden suyu 6lı',
    price: 44.99,
    stock: 180,
    store_id: 1,
    category_id: 7,
    rating: 4.3,
    sell_count: 490,
    images: [{ url: '/src/assets/card-3.png' }]
  },
  {
    id: 20,
    name: 'Çikolata',
    description: 'Bitter çikolata %70 kakao',
    price: 39.99,
    stock: 100,
    store_id: 1,
    category_id: 8,
    rating: 4.7,
    sell_count: 380,
    images: [{ url: '/src/assets/best-1.png' }]
  }
];

// Mock token generator
export const generateMockToken = (userId) => {
  return `mock-jwt-token-${userId}-${Date.now()}`;
};
