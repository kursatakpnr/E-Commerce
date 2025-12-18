import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Grid, List, ChevronRight, Leaf, Star, Loader2, Search } from 'lucide-react';
import { FaAws, FaRedditAlien, FaLyft, FaStripe } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchCategories, 
  fetchProducts, 
  setFilter, 
  setSort, 
  setCategory,
  setOffset,
  FETCH_STATES 
} from '../store/actions/productActions';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterInput, setFilterInput] = useState('');
  const [sortSelect, setSortSelect] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  
  // Sayfa başına ürün sayısı
  const PRODUCTS_PER_PAGE = 4;
  
  // URL parametrelerini al
  const { gender, categoryName, categoryId } = useParams();
  
  // Redux'tan state'leri al
  const categories = useSelector((state) => state.product.categories);
  const productList = useSelector((state) => state.product.productList);
  const total = useSelector((state) => state.product.total);
  const fetchState = useSelector((state) => state.product.fetchState);
  const currentFilter = useSelector((state) => state.product.filter);
  const currentSort = useSelector((state) => state.product.sort);
  const currentCategory = useSelector((state) => state.product.category);
  const currentOffset = useSelector((state) => state.product.offset);
  
  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  
  // Kategorileri fetch et
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // URL'den categoryId değiştiğinde ürünleri yeniden getir
  useEffect(() => {
    const newCategoryId = categoryId || '';
    
    // Kategori değişmişse state'i güncelle ve ürünleri getir
    if (newCategoryId !== currentCategory) {
      dispatch(setCategory(newCategoryId));
      dispatch(setOffset(0));
      setCurrentPage(1);
      dispatch(fetchProducts({ category: newCategoryId, offset: 0 }));
    }
  }, [categoryId, dispatch, currentCategory]);

  // İlk yüklemede ürünleri getir (kategori yoksa)
  useEffect(() => {
    if (fetchState === FETCH_STATES.NOT_FETCHED && !categoryId) {
      dispatch(fetchProducts());
    }
  }, [dispatch, fetchState, categoryId]);

  // Filtre butonuna tıklandığında
  const handleFilterClick = () => {
    // Filter ve sort state'lerini güncelle
    dispatch(setFilter(filterInput));
    dispatch(setSort(sortSelect));
    dispatch(setOffset(0));
    setCurrentPage(1);
    
    // Yeni istek at (mevcut kategori korunarak, sayfa sıfırlanarak)
    dispatch(fetchProducts({ 
      filter: filterInput, 
      sort: sortSelect,
      category: currentCategory,
      offset: 0
    }));
  };

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page) => {
    const newOffset = (page - 1) * PRODUCTS_PER_PAGE;
    setCurrentPage(page);
    dispatch(setOffset(newOffset));
    dispatch(fetchProducts({ offset: newOffset }));
    
    // Sayfanın üstüne scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sıralama seçenekleri
  const sortOptions = [
    { value: '', label: 'Varsayılan' },
    { value: 'price:asc', label: 'Fiyat: Düşükten Yükseğe' },
    { value: 'price:desc', label: 'Fiyat: Yüksekten Düşüğe' },
    { value: 'rating:asc', label: 'Puan: Düşükten Yükseğe' },
    { value: 'rating:desc', label: 'Puan: Yüksekten Düşüğe' }
  ];
  
  // Aktif kategori bilgisini bul
  const activeCategory = useMemo(() => {
    if (categoryId) {
      return categories.find(cat => cat.id === parseInt(categoryId));
    }
    return null;
  }, [categories, categoryId]);
  
  // Taze ve Paketli kategorileri
  const tazeCategories = categories.filter(cat => cat.category_type === 'taze');
  const paketliCategories = categories.filter(cat => cat.category_type === 'paketli' || cat.category_type === 'ev');

  // Loading durumu kontrolü
  const isLoading = fetchState === FETCH_STATES.FETCHING;

  return (
    <div className="flex flex-col">
      {/* Breadcrumb Section */}
      <section className="bg-gray-50 py-6 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-slate-800 font-bold text-2xl">
            {activeCategory ? activeCategory.title : 'Shop'}
          </h1>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-800 font-bold hover:text-blue-500">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link to="/shop" className="text-slate-800 font-bold hover:text-blue-500">Mağaza</Link>
            {gender && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className={`font-bold ${gender === 'taze' ? 'text-green-500' : 'text-orange-500'}`}>
                  {gender === 'taze' ? '🥬 Taze Gıda' : '📦 Paketli'}
                </span>
              </>
            )}
            {activeCategory && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 font-bold">{activeCategory.title}</span>
              </>
            )}
          </nav>
        </div>
      </section>

      {/* Category Header (if category selected) */}
      {activeCategory && (
        <section className="relative h-48 md:h-64 overflow-hidden">
          <img 
            src={activeCategory.img} 
            alt={activeCategory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="px-4 md:px-8 lg:px-16 xl:px-24 text-white">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                activeCategory.category_type === 'taze' ? 'bg-green-500' : 'bg-orange-500'
              }`}>
                {activeCategory.category_type === 'taze' ? '🥬 Taze Gıda' : '📦 Paketli'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{activeCategory.title}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{activeCategory.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{activeCategory.product_count} ürün</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section - Show when no category selected */}
      {!activeCategory && (
        <section className="py-8 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
          {/* Taze Gıda Kategorileri */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              🥬 Taze Gıda
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {tazeCategories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/shop/taze/${category.code}/${category.id}`}
                  className="relative h-40 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img 
                    src={category.img} 
                    alt={category.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end text-white p-3">
                    <h3 className="font-bold text-sm">{category.title}</h3>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{category.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Paketli Gıda Kategorileri */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              📦 Paketli Gıda & Ev
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {paketliCategories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/shop/paketli/${category.code}/${category.id}`}
                  className="relative h-40 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img 
                    src={category.img} 
                    alt={category.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end text-white p-3">
                    <h3 className="font-bold text-sm">{category.title}</h3>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{category.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="py-6 px-4 md:px-8 lg:px-16 xl:px-24 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Results Count */}
          <p className="text-slate-500 text-sm font-bold">Toplam {total} sonuç gösteriliyor</p>
          
          {/* View Mode & Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-sm hidden sm:block">Görünüm:</span>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4 text-slate-600" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Filter Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm w-40 md:w-56 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortSelect}
              onChange={(e) => setSortSelect(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded text-slate-600 text-sm hover:border-gray-400 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Filter Button */}
            <button 
              onClick={handleFilterClick}
              className="bg-blue-500 text-white font-bold py-2 px-5 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Filtrele
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 md:px-8 lg:px-16 xl:px-24">
        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Ürünler yükleniyor...</p>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {productList.map((product) => {
                // Ürünün kategorisini bul
                const productCategory = categories.find(cat => cat.id === product.category_id);
                const categoryType = productCategory?.category_type === 'taze' ? 'taze' : 'paketli';
                
                return (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    image={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
                    title={product.name}
                    department={product.description}
                    originalPrice={`₺${(product.price * 1.2).toFixed(2)}`}
                    price={`₺${product.price.toFixed(2)}`}
                    colors={['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-slate-800']}
                    categoryId={product.category_id}
                    gender={categoryType}
                    categoryName={productCategory?.code}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-1">
                  {/* İlk Sayfa */}
                  <button 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border border-gray-300 rounded-l-lg text-sm font-bold transition-colors
                      ${currentPage === 1 
                        ? 'text-slate-300 cursor-not-allowed' 
                        : 'text-slate-600 hover:bg-gray-50'}`}
                  >
                    İlk
                  </button>
                  
                  {/* Sayfa Numaraları */}
                  {(() => {
                    const pages = [];
                    let startPage = Math.max(1, currentPage - 2);
                    let endPage = Math.min(totalPages, currentPage + 2);
                    
                    // En az 5 sayfa göster (mümkünse)
                    if (endPage - startPage < 4) {
                      if (startPage === 1) {
                        endPage = Math.min(totalPages, startPage + 4);
                      } else if (endPage === totalPages) {
                        startPage = Math.max(1, endPage - 4);
                      }
                    }
                    
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`px-4 py-2 border-t border-b border-gray-300 text-sm font-bold transition-colors
                            ${currentPage === i 
                              ? 'bg-blue-500 text-white border-blue-500' 
                              : 'text-slate-600 hover:bg-gray-50'}`}
                        >
                          {i}
                        </button>
                      );
                    }
                    return pages;
                  })()}
                  
                  {/* Sonraki Sayfa */}
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border border-gray-300 rounded-r-lg text-sm font-bold transition-colors
                      ${currentPage === totalPages 
                        ? 'text-slate-300 cursor-not-allowed' 
                        : 'text-blue-500 hover:bg-gray-50'}`}
                  >
                    Sonraki
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-gray-50">
        <div className="px-4 md:px-8 lg:px-16 xl:px-24 flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-400 tracking-tighter">hooli</span>
          <FaLyft className="h-10 sm:h-12 md:h-14 w-auto text-gray-400" />
          <Leaf className="h-10 sm:h-12 md:h-14 w-auto text-gray-400" strokeWidth={1.5} />
          <FaStripe className="h-10 sm:h-12 md:h-14 w-auto text-gray-400" />
          <FaAws className="h-10 sm:h-12 md:h-14 w-auto text-gray-400" />
          <FaRedditAlien className="h-10 sm:h-12 md:h-14 w-auto text-gray-400" />
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
