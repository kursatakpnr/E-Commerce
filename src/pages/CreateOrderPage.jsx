import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MapPin, CreditCard, Plus, Edit2, Trash2, Check, ChevronRight, X, Package } from 'lucide-react';
import { toast } from 'react-toastify';
import { 
  fetchAddresses, 
  addAddressAction, 
  updateAddressAction, 
  deleteAddressAction,
  fetchCreditCards
} from '../store/actions';
import { getCities } from '../mock/mockApi';

const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { user, addressList } = useSelector(state => state.client);
  const { cart } = useSelector(state => state.shoppingCart);
  
  // Sadece seçili ürünler
  const selectedItems = cart.filter(item => item.checked);
  
  const [currentStep, setCurrentStep] = useState(1); // 1: Adres, 2: Ödeme
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const cities = getCities();
  
  // Kullanıcı giriş kontrolü
  useEffect(() => {
    if (!user) {
      toast.warning('Sipariş vermek için giriş yapmalısınız');
      history.push('/login');
      return;
    }
    
    // Sepette seçili ürün yoksa sepete yönlendir
    if (selectedItems.length === 0) {
      toast.warning('Sepetinizde seçili ürün bulunmuyor');
      history.push('/cart');
      return;
    }
    
    // Adresleri yükle
    const loadData = async () => {
      await dispatch(fetchAddresses());
      setLoading(false);
    };
    loadData();
  }, [user, dispatch, history]);
  
  // Adres listesi yüklendiğinde ilk adresi seç
  useEffect(() => {
    if (addressList.length > 0 && !selectedShippingAddress) {
      setSelectedShippingAddress(addressList[0].id);
      if (sameAsShipping) {
        setSelectedBillingAddress(addressList[0].id);
      }
    }
  }, [addressList]);
  
  // Toplam hesaplama
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const shippingCost = subtotal >= 500 ? 0 : 29.99;
  const total = subtotal + shippingCost;
  
  // Form validasyonu
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) errors.title = 'Adres başlığı gerekli';
    if (!formData.name.trim()) errors.name = 'Ad gerekli';
    if (!formData.surname.trim()) errors.surname = 'Soyad gerekli';
    if (!formData.phone.trim()) errors.phone = 'Telefon gerekli';
    else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Geçerli bir telefon numarası girin';
    }
    if (!formData.city) errors.city = 'İl seçimi gerekli';
    if (!formData.district.trim()) errors.district = 'İlçe gerekli';
    if (!formData.neighborhood.trim()) errors.neighborhood = 'Mahalle gerekli';
    if (!formData.address.trim()) errors.address = 'Adres detayı gerekli';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (editingAddress) {
        // Güncelleme
        const result = await dispatch(updateAddressAction(editingAddress.id, formData));
        if (result.success) {
          toast.success('Adres güncellendi');
        } else {
          toast.error('Adres güncellenirken hata oluştu');
        }
      } else {
        // Yeni ekleme
        const result = await dispatch(addAddressAction(formData));
        if (result.success) {
          toast.success('Adres eklendi');
          // Yeni adresi seç
          setSelectedShippingAddress(result.data.id);
          if (sameAsShipping) {
            setSelectedBillingAddress(result.data.id);
          }
        } else {
          toast.error('Adres eklenirken hata oluştu');
        }
      }
      
      // Formu kapat ve sıfırla
      setShowAddressForm(false);
      setEditingAddress(null);
      setFormData({
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: '',
        address: ''
      });
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };
  
  // Adres düzenleme
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
      address: address.address
    });
    setShowAddressForm(true);
  };
  
  // Adres silme
  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Bu adresi silmek istediğinize emin misiniz?')) {
      const result = await dispatch(deleteAddressAction(addressId));
      if (result.success) {
        toast.success('Adres silindi');
        // Silinen adres seçiliyse seçimi kaldır
        if (selectedShippingAddress === addressId) {
          setSelectedShippingAddress(addressList.find(a => a.id !== addressId)?.id || null);
        }
        if (selectedBillingAddress === addressId) {
          setSelectedBillingAddress(addressList.find(a => a.id !== addressId)?.id || null);
        }
      } else {
        toast.error('Adres silinirken hata oluştu');
      }
    }
  };
  
  // Sonraki adıma geç
  const handleNextStep = () => {
    if (!selectedShippingAddress) {
      toast.warning('Lütfen teslimat adresi seçin');
      return;
    }
    if (!sameAsShipping && !selectedBillingAddress) {
      toast.warning('Lütfen fatura adresi seçin');
      return;
    }
    setCurrentStep(2);
  };
  
  // Form modal kapatma
  const handleCloseForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setFormData({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      address: ''
    });
    setFormErrors({});
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb/Stepper */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-[#23A6F0]' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#23A6F0] text-white' : 'bg-gray-200'}`}>
              <MapPin className="w-5 h-5" />
            </div>
            <span className="ml-2 font-medium">Adres Bilgileri</span>
          </div>
          <ChevronRight className="w-6 h-6 mx-4 text-gray-400" />
          <div className={`flex items-center ${currentStep >= 2 ? 'text-[#23A6F0]' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#23A6F0] text-white' : 'bg-gray-200'}`}>
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="ml-2 font-medium">Ödeme</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Adres/Ödeme */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <>
                {/* Teslimat Adresi */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Teslimat Adresi</h2>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1e8ed8] font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Yeni Adres Ekle
                    </button>
                  </div>
                  
                  {addressList.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Kayıtlı adresiniz bulunmuyor</p>
                      <p className="text-sm">Yeni adres ekleyerek devam edebilirsiniz</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addressList.map(address => (
                        <div
                          key={address.id}
                          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedShippingAddress === address.id
                              ? 'border-[#23A6F0] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            setSelectedShippingAddress(address.id);
                            if (sameAsShipping) {
                              setSelectedBillingAddress(address.id);
                            }
                          }}
                        >
                          {selectedShippingAddress === address.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-[#23A6F0] rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-800">{address.title}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {address.name} {address.surname}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            {address.phone}
                          </p>
                          <p className="text-sm text-gray-500">
                            {address.neighborhood}, {address.district}, {address.city}
                          </p>
                          <p className="text-sm text-gray-500">
                            {address.address}
                          </p>
                          
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(address);
                              }}
                              className="text-xs text-[#23A6F0] hover:text-[#1e8ed8] flex items-center gap-1"
                            >
                              <Edit2 className="w-3 h-3" /> Düzenle
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(address.id);
                              }}
                              className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" /> Sil
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Fatura Adresi */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Fatura Adresi</h2>
                  
                  <label className="flex items-center gap-3 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => {
                        setSameAsShipping(e.target.checked);
                        if (e.target.checked) {
                          setSelectedBillingAddress(selectedShippingAddress);
                        }
                      }}
                      className="w-5 h-5 text-[#23A6F0] rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Teslimat adresiyle aynı</span>
                  </label>
                  
                  {!sameAsShipping && addressList.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addressList.map(address => (
                        <div
                          key={address.id}
                          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedBillingAddress === address.id
                              ? 'border-[#23A6F0] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedBillingAddress(address.id)}
                        >
                          {selectedBillingAddress === address.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-[#23A6F0] rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-800">{address.title}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {address.name} {address.surname}
                          </p>
                          <p className="text-sm text-gray-500">
                            {address.neighborhood}, {address.district}, {address.city}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Devam Et Butonu */}
                <div className="flex justify-end">
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedShippingAddress}
                    className="px-8 py-3 bg-[#23A6F0] text-white rounded-lg font-semibold hover:bg-[#1e8ed8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Ödemeye Geç
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
            
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[#23A6F0] hover:text-[#1e8ed8]"
                  >
                    ← Adres Bilgilerine Dön
                  </button>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Ödeme Yöntemi</h2>
                <div className="text-center py-12 text-gray-500">
                  <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Ödeme sistemi yakında aktif olacak</p>
                  <p className="text-sm text-gray-400 mt-2">Kredi kartı ile ödeme seçeneği eklenecektir</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Sipariş Özeti</h2>
              
              {/* Ürünler */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {selectedItems.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images?.[0]?.url || '/src/assets/card-1.jpg'}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.count} adet × {item.product.price.toFixed(2)} ₺
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {(item.product.price * item.count).toFixed(2)} ₺
                    </span>
                  </div>
                ))}
              </div>
              
              <hr className="my-4" />
              
              {/* Fiyat detayları */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="text-gray-800">{subtotal.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kargo</span>
                  <span className={shippingCost === 0 ? 'text-green-600 font-medium' : 'text-gray-800'}>
                    {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost.toFixed(2)} ₺`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-gray-500">
                    {(500 - subtotal).toFixed(2)} ₺ daha ekleyin, kargo bedava!
                  </p>
                )}
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Toplam</span>
                <span className="text-xl font-bold text-[#23A6F0]">{total.toFixed(2)} ₺</span>
              </div>
              
              {/* Seçili Adres Bilgisi */}
              {selectedShippingAddress && currentStep === 1 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Package className="w-4 h-4" />
                    <span>Teslimat Adresi:</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {addressList.find(a => a.id === selectedShippingAddress)?.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Adres Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
              </h3>
              <button
                onClick={handleCloseForm}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
              {/* Adres Başlığı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres Başlığı *
                </label>
                <input
                  type="text"
                  placeholder="Örn: Ev, İş"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.title && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
                )}
              </div>
              
              {/* Ad Soyad */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.surname ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.surname && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.surname}</p>
                  )}
                </div>
              </div>
              
              {/* Telefon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon *
                </label>
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>
              
              {/* İl */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İl *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">İl Seçin</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {formErrors.city && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                )}
              </div>
              
              {/* İlçe ve Mahalle */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    İlçe *
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.district ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.district && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.district}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mahalle *
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.neighborhood ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.neighborhood && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.neighborhood}</p>
                  )}
                </div>
              </div>
              
              {/* Adres Detayı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres Detayı *
                </label>
                <textarea
                  rows={3}
                  placeholder="Sokak, cadde, bina no, daire no vb."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                    formErrors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.address && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                )}
              </div>
              
              {/* Butonlar */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-[#23A6F0] text-white rounded-lg hover:bg-[#1e8ed8] transition-colors font-medium"
                >
                  {editingAddress ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrderPage;
