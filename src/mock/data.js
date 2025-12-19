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
  { id: 1, code: 'meyve-sebze', title: 'Meyve & Sebze', img: '/src/assets/category-meyve-sebze.jpg', rating: 4.9, category_type: 'taze', product_count: 85 },
  { id: 2, code: 'et-tavuk', title: 'Et & Tavuk', img: '/src/assets/category-et-tavuk.jpg', rating: 4.85, category_type: 'taze', product_count: 45 },
  { id: 3, code: 'sut-urunleri', title: 'Süt Ürünleri', img: '/src/assets/category-sut-urunleri.jpg', rating: 4.8, category_type: 'taze', product_count: 62 },
  { id: 4, code: 'firin', title: 'Fırın & Unlu Mamul', img: '/src/assets/category-firin.jpg', rating: 4.75, category_type: 'taze', product_count: 38 },
  { id: 5, code: 'deniz-urunleri', title: 'Deniz Ürünleri', img: '/src/assets/category-deniz-urunleri.jpg', rating: 4.7, category_type: 'taze', product_count: 28 },
  { id: 6, code: 'sarkuteri', title: 'Şarküteri', img: '/src/assets/category-sarkuteri.jpg', rating: 4.65, category_type: 'taze', product_count: 34 },
  
  // Paketli Gıda Kategorileri
  { id: 7, code: 'icecekler', title: 'İçecekler', img: '/src/assets/category-icecekler.jpg', rating: 4.6, category_type: 'paketli', product_count: 95 },
  { id: 8, code: 'atistirmalik', title: 'Atıştırmalıklar', img: '/src/assets/category-atistirmalik.jpg', rating: 4.55, category_type: 'paketli', product_count: 72 },
  { id: 9, code: 'kahvaltilik', title: 'Kahvaltılıklar', img: '/src/assets/category-kahvaltilik.jpg', rating: 4.5, category_type: 'paketli', product_count: 56 },
  { id: 10, code: 'dondurulmus', title: 'Dondurulmuş Gıda', img: '/src/assets/category-dondurulmus.jpg', rating: 4.45, category_type: 'paketli', product_count: 48 }
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
    category_id: 9,
    rating: 4.5,
    sell_count: 175,
    images: [{ url: '/src/assets/best-seller-left.jpg' }]
  },
  {
    id: 12,
    name: 'Makarna',
    description: 'İtalyan usulü spagetti makarna',
    price: 29.99,
    stock: 150,
    store_id: 1,
    category_id: 10,
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

// Türkiye İlleri
export const turkishCities = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin',
  'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur',
  'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan',
  'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkâri', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
  'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir',
  'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş',
  'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas',
  'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
];

// Mock Adresler (kullanıcıya göre)
export let mockAddresses = [
  {
    id: 1,
    user_id: 1,
    title: 'Ev',
    name: 'Test',
    surname: 'Müşteri',
    phone: '05551234567',
    city: 'İstanbul',
    district: 'Kadıköy',
    neighborhood: 'Caferağa Mah.',
    address: 'Moda Cad. No: 12 Daire: 5'
  },
  {
    id: 2,
    user_id: 1,
    title: 'İş',
    name: 'Test',
    surname: 'Müşteri',
    phone: '05559876543',
    city: 'İstanbul',
    district: 'Şişli',
    neighborhood: 'Mecidiyeköy Mah.',
    address: 'Büyükdere Cad. Plaza İş Merkezi Kat: 5'
  }
];

// Mock Kredi Kartları
export let mockCreditCards = [
  {
    id: 1,
    user_id: 1,
    card_no: '**** **** **** 1234',
    expire_month: 12,
    expire_year: 2026,
    name_on_card: 'TEST MUSTERI'
  }
];
