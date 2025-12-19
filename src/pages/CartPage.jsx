import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, Truck, ChevronRight } from 'lucide-react';
import { removeFromCart, updateCartItem, toggleCartItem } from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';

const CartPage = () => {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  // Toplam tutarlar
  const selectedItems = cart.filter(item => item.checked);
  const totalAmount = selectedItems.reduce((total, item) => total + (item.product.price * item.count), 0);
  const totalItems = selectedItems.reduce((total, item) => total + item.count, 0);
  const totalOriginalAmount = selectedItems.reduce((total, item) => total + ((item.product.originalPrice || item.product.price * 1.2) * item.count), 0);
  const discount = totalOriginalAmount - totalAmount;
  
  // Kargo ücreti (500 TL ve üzeri ücretsiz)
  const FREE_SHIPPING_THRESHOLD = 500;
  const SHIPPING_COST = 29.99;
  const isShippingFree = totalAmount >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isShippingFree ? 0 : (selectedItems.length > 0 ? SHIPPING_COST : 0);
  const finalTotal = totalAmount + shippingCost;

  // Adet değiştir
  const handleQuantityChange = (productId, newCount) => {
    if (newCount < 1) {
      dispatch(removeFromCart(productId));
      toast.info('Ürün sepetten çıkarıldı');
    } else {
      dispatch(updateCartItem(productId, newCount));
    }
  };

  // Ürünü sil
  const handleRemove = (productId, productName) => {
    dispatch(removeFromCart(productId));
    toast.info(`${productName} sepetten çıkarıldı`);
  };

  // Ürünü seç/seçme
  const handleToggle = (productId) => {
    dispatch(toggleCartItem(productId));
  };

  // Tümünü seç/kaldır
  const handleSelectAll = () => {
    const allSelected = cart.every(item => item.checked);
    cart.forEach(item => {
      if (allSelected && item.checked) {
        dispatch(toggleCartItem(item.product.id));
      } else if (!allSelected && !item.checked) {
        dispatch(toggleCartItem(item.product.id));
      }
    });
  };

  // Boş sepet
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Sepetiniz Boş</h2>
            <p className="text-gray-500 mb-6">Sepetinizde henüz ürün bulunmamaktadır.</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-[#23A6F0] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1e8ed8] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2 text-gray-500">
            <li><Link to="/" className="hover:text-[#23A6F0]">Ana Sayfa</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-[#23A6F0] font-medium">Sepetim</li>
          </ol>
        </nav>

        {/* Başlık */}
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Sepetim ({cart.length} Ürün)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol - Ürün Listesi */}
          <div className="lg:col-span-2 space-y-4">
            {/* Bilgi Bandı */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <p className="text-sm text-green-700">
                Sepetindeki ürünleri seçerek sipariş oluşturabilirsin.
              </p>
            </div>

            {/* Tümünü Seç */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cart.every(item => item.checked)}
                  onChange={handleSelectAll}
                  className="w-5 h-5 rounded border-gray-300 text-[#23A6F0] focus:ring-[#23A6F0] cursor-pointer"
                />
                <span className="font-medium text-slate-800">Tümünü Seç</span>
                <span className="text-sm text-gray-500">({cart.length} ürün)</span>
              </label>
            </div>

            {/* Ürün Kartları */}
            {cart.map((item) => (
              <div 
                key={item.product.id} 
                className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
                  item.checked ? 'border-[#23A6F0]/30' : 'border-gray-100'
                }`}
              >
                <div className="p-4 flex items-center gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggle(item.product.id)}
                    className="w-5 h-5 rounded border-gray-300 text-[#23A6F0] focus:ring-[#23A6F0] cursor-pointer flex-shrink-0"
                  />

                  {/* Ürün Görseli */}
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-contain rounded-lg bg-gray-50 border border-gray-100"
                    />
                  </Link>

                  {/* Ürün Bilgileri */}
                  <div className="flex-grow min-w-0">
                    <Link 
                      to={`/product/${item.product.id}`}
                      className="text-slate-800 font-medium hover:text-[#23A6F0] transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.product.department}</p>
                    
                    {/* Miktar Kontrolleri - Mobil */}
                    <div className="flex items-center gap-3 mt-3 lg:hidden">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">{item.count}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product.id, item.product.name)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Miktar Kontrolleri - Desktop */}
                  <div className="hidden lg:flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                      className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-medium">{item.count}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                      className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Fiyat */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-[#23A6F0]">
                      {(item.product.price * item.count).toFixed(2)} TL
                    </p>
                    {item.count > 1 && (
                      <p className="text-xs text-gray-500">
                        Birim: {item.product.price.toFixed(2)} TL
                      </p>
                    )}
                  </div>

                  {/* Silme - Desktop */}
                  <button
                    onClick={() => handleRemove(item.product.id, item.product.name)}
                    className="hidden lg:flex p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sağ - Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Sipariş Özeti</h2>
              
              {/* Seçili Ürün Sayısı */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Seçili Ürünler</span>
                <span className="font-medium">{totalItems} adet</span>
              </div>

              {/* Ara Toplam */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Ara Toplam</span>
                <span className="font-medium">{totalOriginalAmount.toFixed(2)} TL</span>
              </div>

              {/* İndirim */}
              {discount > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">İndirim</span>
                  <span className="font-medium text-green-600">-{discount.toFixed(2)} TL</span>
                </div>
              )}

              {/* Kargo */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Kargo</span>
                {isShippingFree ? (
                  <span className="font-medium text-green-600">Ücretsiz</span>
                ) : (
                  <span className="font-medium">{shippingCost.toFixed(2)} TL</span>
                )}
              </div>

              {/* Ücretsiz Kargo Bilgisi */}
              {!isShippingFree && selectedItems.length > 0 && (
                <div className="py-3 border-b border-gray-100">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700">
                      <Truck className="w-4 h-4 inline mr-1" />
                      <strong>{(FREE_SHIPPING_THRESHOLD - totalAmount).toFixed(2)} TL</strong> daha ekle, <strong>kargo bedava!</strong>
                    </p>
                    <div className="mt-2 bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Toplam */}
              <div className="flex justify-between items-center py-4">
                <span className="text-lg font-bold text-slate-800">Toplam</span>
                <span className="text-xl font-bold text-[#23A6F0]">{finalTotal.toFixed(2)} TL</span>
              </div>

              {/* Sipariş Ver Butonu */}
              <button
                onClick={() => history.push('/order')}
                disabled={selectedItems.length === 0}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                Sipariş Oluştur ({selectedItems.length})
              </button>

              {/* Bilgi */}
              {selectedItems.length === 0 && (
                <p className="text-sm text-center text-gray-500 mt-3">
                  Sipariş oluşturmak için en az bir ürün seçin
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
