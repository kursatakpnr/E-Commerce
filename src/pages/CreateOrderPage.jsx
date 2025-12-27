import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MapPin, CreditCard, Plus, Edit2, Trash2, Check, ChevronRight, X, Package, Lock, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { 
  fetchAddresses, 
  addAddressAction, 
  updateAddressAction, 
  deleteAddressAction,
  fetchCreditCards,
  addCreditCardAction,
  updateCreditCardAction,
  deleteCreditCardAction
} from '../store/actions';
import { getCities } from '../mock/mockApi';
import fallbackImage from '../assets/card-1.jpg';

const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { user, addressList, creditCards } = useSelector(state => state.client);
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
  
  // Credit Card State
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [cardFormData, setCardFormData] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
    cvv: ''
  });
  const [cardFormErrors, setCardFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  
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
    
    // Adresleri ve kartları yükle
    const loadData = async () => {
      await Promise.all([
        dispatch(fetchAddresses()),
        dispatch(fetchCreditCards())
      ]);
      setLoading(false);
    };
    loadData();
  }, [user, dispatch, history]);
  
  // Kart listesi yüklendiğinde ilk kartı seç
  useEffect(() => {
    if (creditCards.length > 0 && !selectedCard) {
      setSelectedCard(creditCards[0].id);
    }
  }, [creditCards]);
  
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
  
  // ============== CREDIT CARD FUNCTIONS ==============
  
  // Kart numarası formatlama (4 haneli gruplar)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };
  
  // Kart form validasyonu
  const validateCardForm = () => {
    const errors = {};
    const cardNoDigits = cardFormData.card_no.replace(/\s/g, '');
    
    if (!cardNoDigits) errors.card_no = 'Kart numarası gerekli';
    else if (cardNoDigits.length !== 16) errors.card_no = 'Kart numarası 16 haneli olmalı';
    
    if (!cardFormData.expire_month) errors.expire_month = 'Ay gerekli';
    else if (parseInt(cardFormData.expire_month) < 1 || parseInt(cardFormData.expire_month) > 12) {
      errors.expire_month = 'Geçersiz ay';
    }
    
    if (!cardFormData.expire_year) errors.expire_year = 'Yıl gerekli';
    else {
      const currentYear = new Date().getFullYear();
      if (parseInt(cardFormData.expire_year) < currentYear) {
        errors.expire_year = 'Geçersiz yıl';
      }
    }
    
    if (!cardFormData.name_on_card.trim()) errors.name_on_card = 'Kart üzerindeki isim gerekli';
    
    if (!editingCard && !cardFormData.cvv) errors.cvv = 'CVV gerekli';
    else if (!editingCard && cardFormData.cvv.length < 3) errors.cvv = 'CVV 3-4 haneli olmalı';
    
    setCardFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Kart form submit
  const handleCardFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCardForm()) return;
    
    try {
      const cardData = {
        card_no: cardFormData.card_no.replace(/\s/g, ''),
        expire_month: parseInt(cardFormData.expire_month),
        expire_year: parseInt(cardFormData.expire_year),
        name_on_card: cardFormData.name_on_card.toUpperCase()
      };
      
      if (editingCard) {
        // Güncelleme
        const result = await dispatch(updateCreditCardAction(editingCard.id, cardData));
        if (result.success) {
          toast.success('Kart güncellendi');
        } else {
          toast.error('Kart güncellenirken hata oluştu');
        }
      } else {
        // Yeni ekleme
        const result = await dispatch(addCreditCardAction(cardData));
        if (result.success) {
          toast.success('Kart eklendi');
          setSelectedCard(result.data.id);
        } else {
          toast.error('Kart eklenirken hata oluştu');
        }
      }
      
      handleCloseCardForm();
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };
  
  // Kart düzenleme
  const handleEditCard = (card) => {
    setEditingCard(card);
    setCardFormData({
      card_no: card.card_no.replace(/\*/g, '').replace(/\s/g, ''),
      expire_month: card.expire_month.toString(),
      expire_year: card.expire_year.toString(),
      name_on_card: card.name_on_card,
      cvv: ''
    });
    setShowCardForm(true);
  };
  
  // Kart silme
  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Bu kartı silmek istediğinize emin misiniz?')) {
      const result = await dispatch(deleteCreditCardAction(cardId));
      if (result.success) {
        toast.success('Kart silindi');
        if (selectedCard === cardId) {
          setSelectedCard(creditCards.find(c => c.id !== cardId)?.id || null);
        }
      } else {
        toast.error('Kart silinirken hata oluştu');
      }
    }
  };
  
  // Kart form kapatma
  const handleCloseCardForm = () => {
    setShowCardForm(false);
    setEditingCard(null);
    setCardFormData({
      card_no: '',
      expire_month: '',
      expire_year: '',
      name_on_card: '',
      cvv: ''
    });
    setCardFormErrors({});
  };
  
  // Kart tipi belirleme (basit versiyon)
  const getCardType = (cardNo) => {
    const firstDigit = cardNo.replace(/\s/g, '').charAt(0);
    if (firstDigit === '4') return { name: 'Visa', color: 'from-blue-600 to-blue-800' };
    if (firstDigit === '5') return { name: 'Mastercard', color: 'from-red-500 to-orange-500' };
    if (firstDigit === '3') return { name: 'Amex', color: 'from-green-500 to-teal-600' };
    return { name: 'Card', color: 'from-gray-600 to-gray-800' };
  };
  
  // Sipariş tamamlama
  const handleCompleteOrder = async () => {
    if (!selectedCard) {
      toast.warning('Lütfen bir ödeme yöntemi seçin');
      return;
    }
    
    setIsProcessing(true);
    
    // Simüle sipariş işlemi
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Siparişiniz başarıyla oluşturuldu!');
      history.push('/');
    }, 2000);
  };
  
  // Yıl seçenekleri
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear + i);
  
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
              <>
                {/* Kayıtlı Kartlar */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-[#23A6F0] hover:text-[#1e8ed8]"
                    >
                      ← Adres Bilgilerine Dön
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Ödeme Yöntemi</h2>
                    <button
                      onClick={() => setShowCardForm(true)}
                      className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1e8ed8] font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Yeni Kart Ekle
                    </button>
                  </div>
                  
                  {creditCards.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>Kayıtlı kartınız bulunmuyor</p>
                      <p className="text-sm text-gray-400 mt-2">Yeni kart ekleyerek ödeme yapabilirsiniz</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {creditCards.map(card => {
                        const cardType = getCardType(card.card_no);
                        return (
                          <div
                            key={card.id}
                            className={`relative cursor-pointer transition-all ${
                              selectedCard === card.id
                                ? 'ring-2 ring-[#23A6F0] ring-offset-2'
                                : 'hover:shadow-lg'
                            }`}
                            onClick={() => setSelectedCard(card.id)}
                          >
                            {/* Kart Görsel */}
                            <div className={`bg-gradient-to-br ${cardType.color} rounded-xl p-5 text-white shadow-lg aspect-[1.6/1]`}>
                              {selectedCard === card.id && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-[#23A6F0]" />
                                </div>
                              )}
                              
                              <div className="flex justify-between items-start mb-6">
                                <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md" />
                                <span className="text-sm font-semibold opacity-90">{cardType.name}</span>
                              </div>
                              
                              <div className="mb-4">
                                <p className="text-lg tracking-[0.2em] font-mono">
                                  {card.card_no}
                                </p>
                              </div>
                              
                              <div className="flex justify-between items-end">
                                <div>
                                  <p className="text-[10px] uppercase opacity-70 mb-0.5">Kart Sahibi</p>
                                  <p className="text-sm font-medium truncate max-w-[180px]">{card.name_on_card}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] uppercase opacity-70 mb-0.5">Son Kullanma</p>
                                  <p className="text-sm font-medium">
                                    {String(card.expire_month).padStart(2, '0')}/{String(card.expire_year).slice(-2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Kart Aksiyonları */}
                            <div className="flex gap-2 mt-3 justify-end">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditCard(card);
                                }}
                                className="text-xs text-[#23A6F0] hover:text-[#1e8ed8] flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50"
                              >
                                <Edit2 className="w-3 h-3" /> Düzenle
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCard(card.id);
                                }}
                                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" /> Sil
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {/* Güvenlik Bilgisi */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Güvenli Ödeme</p>
                    <p className="text-xs text-green-600 mt-1">
                      Tüm ödeme işlemleri 256-bit SSL şifreleme ile korunmaktadır. Kart bilgileriniz güvenle saklanır.
                    </p>
                  </div>
                </div>
                
                {/* Sipariş Tamamla Butonu */}
                <div className="flex justify-end">
                  <button
                    onClick={handleCompleteOrder}
                    disabled={!selectedCard || isProcessing}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        İşleniyor...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Siparişi Tamamla - {total.toFixed(2)} ₺
                      </>
                    )}
                  </button>
                </div>
              </>
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
                      src={item.product.images?.[0]?.url || fallbackImage}
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
      
      {/* Kart Form Modal */}
      {showCardForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingCard ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}
              </h3>
              <button
                onClick={handleCloseCardForm}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Kart Önizleme */}
            <div className="p-4 bg-gray-50">
              <div className={`bg-gradient-to-br ${getCardType(cardFormData.card_no || '0').color} rounded-xl p-5 text-white shadow-lg aspect-[1.6/1] max-w-sm mx-auto`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md" />
                  <span className="text-sm font-semibold opacity-90">{getCardType(cardFormData.card_no || '0').name}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-lg tracking-[0.2em] font-mono">
                    {cardFormData.card_no ? formatCardNumber(cardFormData.card_no) : '•••• •••• •••• ••••'}
                  </p>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase opacity-70 mb-0.5">Kart Sahibi</p>
                    <p className="text-sm font-medium truncate max-w-[150px]">
                      {cardFormData.name_on_card || 'AD SOYAD'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase opacity-70 mb-0.5">Son Kullanma</p>
                    <p className="text-sm font-medium">
                      {cardFormData.expire_month ? String(cardFormData.expire_month).padStart(2, '0') : 'MM'}/
                      {cardFormData.expire_year ? String(cardFormData.expire_year).slice(-2) : 'YY'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleCardFormSubmit} className="p-4 space-y-4">
              {/* Kart Numarası */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Numarası *
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formatCardNumber(cardFormData.card_no)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, '').slice(0, 16);
                    setCardFormData({ ...cardFormData, card_no: value });
                  }}
                  maxLength={19}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono ${
                    cardFormErrors.card_no ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {cardFormErrors.card_no && (
                  <p className="text-red-500 text-xs mt-1">{cardFormErrors.card_no}</p>
                )}
              </div>
              
              {/* Kart Sahibi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Üzerindeki İsim *
                </label>
                <input
                  type="text"
                  placeholder="AD SOYAD"
                  value={cardFormData.name_on_card}
                  onChange={(e) => setCardFormData({ ...cardFormData, name_on_card: e.target.value.toUpperCase() })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase ${
                    cardFormErrors.name_on_card ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {cardFormErrors.name_on_card && (
                  <p className="text-red-500 text-xs mt-1">{cardFormErrors.name_on_card}</p>
                )}
              </div>
              
              {/* Son Kullanma ve CVV */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ay *
                  </label>
                  <select
                    value={cardFormData.expire_month}
                    onChange={(e) => setCardFormData({ ...cardFormData, expire_month: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      cardFormErrors.expire_month ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">AA</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>
                        {String(month).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  {cardFormErrors.expire_month && (
                    <p className="text-red-500 text-xs mt-1">{cardFormErrors.expire_month}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yıl *
                  </label>
                  <select
                    value={cardFormData.expire_year}
                    onChange={(e) => setCardFormData({ ...cardFormData, expire_year: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      cardFormErrors.expire_year ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">YY</option>
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {cardFormErrors.expire_year && (
                    <p className="text-red-500 text-xs mt-1">{cardFormErrors.expire_year}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV *
                  </label>
                  <input
                    type="password"
                    placeholder="•••"
                    value={cardFormData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                      setCardFormData({ ...cardFormData, cvv: value });
                    }}
                    maxLength={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      cardFormErrors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {cardFormErrors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{cardFormErrors.cvv}</p>
                  )}
                </div>
              </div>
              
              {/* Güvenlik Notu */}
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <span>Kart bilgileriniz güvenli bir şekilde saklanmaktadır. CVV bilginiz kaydedilmez.</span>
              </div>
              
              {/* Butonlar */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseCardForm}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-[#23A6F0] text-white rounded-lg hover:bg-[#1e8ed8] transition-colors font-medium"
                >
                  {editingCard ? 'Güncelle' : 'Kartı Kaydet'}
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
