import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Heart, ShoppingCart, Eye, Star, Leaf, Loader2, ArrowLeft } from 'lucide-react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaAws, FaRedditAlien, FaLyft, FaStripe } from 'react-icons/fa';
import { fetchProductById, fetchCategories, FETCH_STATES } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import fallbackImage from '../assets/card-1.jpg';

const ProductDetailPage = () => {
  const { productId, gender, categoryName, categoryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  // Redux state
  const currentProduct = useSelector((state) => state.product.currentProduct);
  const fetchState = useSelector((state) => state.product.fetchState);
  const categories = useSelector((state) => state.product.categories);
  const productList = useSelector((state) => state.product.productList);

  // Ürünü fetch et
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  // Kategorileri fetch et (breadcrumb için)
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Loading durumu
  const isLoading = fetchState === FETCH_STATES.FETCHING;

  // Kategori bilgisini bul
  const productCategory = currentProduct 
    ? categories.find(cat => cat.id === currentProduct.category_id)
    : null;

  // İlgili ürünler (aynı kategoriden)
  const relatedProducts = productList
    .filter(p => p.category_id === currentProduct?.category_id && p.id !== currentProduct?.id)
    .slice(0, 4);

  // Geri butonu
  const handleGoBack = () => {
    history.goBack();
  };

  // Sepete ekle
  const handleAddToCart = () => {
    if (!currentProduct) return;
    
    const product = {
      id: currentProduct.id,
      name: currentProduct.name,
      image: currentProduct.images?.[0]?.url || fallbackImage,
      price: currentProduct.price,
      originalPrice: currentProduct.price * 1.2,
      department: productCategory?.title || 'Ürün',
      categoryId: currentProduct.category_id,
      rating: currentProduct.rating,
      stock: currentProduct.stock
    };
    
    dispatch(addToCart(product));
    toast.success(`${currentProduct.name} sepete eklendi!`);
  };

  // Loading spinner
  if (isLoading || !currentProduct) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Ürün yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Ürün görselleri (varsayılan görsel yoksa placeholder)
  const productImages = currentProduct.images?.length > 0 
    ? currentProduct.images.map(img => img.url)
    : [fallbackImage];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb Section */}
      <section className="bg-gray-50 py-4 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Back Button */}
          <button 
            onClick={handleGoBack}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-slate-800 font-bold hover:text-blue-500">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link to="/shop" className="text-slate-800 font-bold hover:text-blue-500">Mağaza</Link>
            {productCategory && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <Link 
                  to={`/shop/${productCategory.category_type === 'taze' ? 'taze' : 'paketli'}/${productCategory.code}/${productCategory.id}`}
                  className="text-slate-800 font-bold hover:text-blue-500"
                >
                  {productCategory.title}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 font-bold">{currentProduct.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-8 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            {/* Main Image with Navigation */}
            <div className="relative bg-white rounded-lg overflow-hidden mb-4">
              <img 
                src={productImages[selectedImage]} 
                alt={currentProduct.name} 
                className="w-full h-[400px] md:h-[500px] object-contain"
              />
              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : productImages.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                  >
                    <ChevronLeft className="w-6 h-6 text-slate-600" />
                  </button>
                  <button 
                    onClick={() => setSelectedImage(prev => prev < productImages.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                  >
                    <ChevronRight className="w-6 h-6 text-slate-600" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-4">
                {productImages.map((thumb, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
                  >
                    <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-slate-800 font-bold text-2xl mb-2">{currentProduct.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(currentProduct.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-slate-500 text-sm font-bold">{currentProduct.rating?.toFixed(1)} Puan</span>
              <span className="text-slate-400 text-sm">({currentProduct.sell_count} satış)</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-slate-800 font-bold text-2xl">₺{currentProduct.price?.toFixed(2)}</span>
              <span className="text-slate-400 line-through ml-2">₺{(currentProduct.price * 1.2).toFixed(2)}</span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-slate-500 font-bold text-sm">Stok Durumu:</span>
              <span className={`font-bold text-sm ${currentProduct.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {currentProduct.stock > 0 ? `${currentProduct.stock} adet stokta` : 'Stokta yok'}
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {currentProduct.description}
            </p>

            <hr className="mb-6" />

            {/* Color Options */}
            <div className="flex items-center gap-3 mb-8">
              {['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-slate-800'].map((color, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 rounded-full ${color} ${selectedColor === index ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={currentProduct.stock <= 0}
                className="bg-blue-500 text-white font-bold py-3 px-8 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Sepete Ekle
              </button>
              <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5 text-slate-600" />
              </button>
              <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Eye className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description Tabs */}
      <section className="py-8 px-4 md:px-8 lg:px-16 xl:px-24">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-gray-200 mb-8">
          <button className="text-slate-500 font-bold text-sm pb-4 border-b-2 border-transparent hover:text-slate-800">
            Açıklama
          </button>
          <button className="text-slate-800 font-bold text-sm pb-4 border-b-2 border-blue-500">
            Ek Bilgiler
          </button>
          <button className="text-slate-500 font-bold text-sm pb-4 border-b-2 border-transparent hover:text-slate-800">
            Değerlendirmeler <span className="text-green-500">({currentProduct.sell_count})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description Column */}
          <div>
            <h3 className="text-slate-800 font-bold text-xl mb-4">Ürün Özellikleri</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              {currentProduct.description}
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Yüksek kalite standartlarına uygun olarak üretilmiştir.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Aileniz için güvenle tercih edebilirsiniz.
            </p>
          </div>

          {/* Additional Info Column */}
          <div>
            <h3 className="text-slate-800 font-bold text-xl mb-4">Ek Bilgiler</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                Ürün ID: {currentProduct.id}
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                Kategori: {productCategory?.title || 'Belirtilmemiş'}
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                Stok: {currentProduct.stock} adet
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                Satış Sayısı: {currentProduct.sell_count}
              </li>
            </ul>
          </div>

          {/* Reviews Column */}
          <div>
            <h3 className="text-slate-800 font-bold text-xl mb-4">Müşteri Yorumları</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(currentProduct.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-slate-600 font-bold">{currentProduct.rating?.toFixed(1)}/5</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                Harika lezzet, tavsiye ederim
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                Kaliteli ve taze ürün
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                Hızlı teslimat, teşekkürler
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
          <h2 className="text-slate-800 font-bold text-xl mb-8">BENZERİ ÜRÜNLER</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => {
              const relCategory = categories.find(cat => cat.id === relatedProduct.category_id);
              const relCategoryType = relCategory?.category_type === 'taze' ? 'taze' : 'paketli';
              
              return (
                <ProductCard 
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  image={relatedProduct.images?.[0]?.url || fallbackImage}
                  title={relatedProduct.name}
                  department={relatedProduct.description}
                  originalPrice={`₺${(relatedProduct.price * 1.2).toFixed(2)}`}
                  price={`₺${relatedProduct.price.toFixed(2)}`}
                  colors={['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-slate-800']}
                  categoryId={relatedProduct.category_id}
                  gender={relCategoryType}
                  categoryName={relCategory?.code}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Brands Section */}
      <section className="py-12 bg-gray-100">
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

export default ProductDetailPage;
