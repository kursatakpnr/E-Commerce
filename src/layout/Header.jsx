import React, { useState, useEffect } from 'react';
import { User, Search, ShoppingCart, Menu, X, Heart, ChevronDown, LogOut, Phone, Mail, MapPin } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/clientActions';
import { fetchCategories } from '../store/actions/productActions';
import { getGravatarUrl } from '../utils/gravatar';
import { toast } from 'react-toastify';
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Redux'tan kullanıcı bilgisini al
  const user = useSelector((state) => state.client.user);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const categories = useSelector((state) => state.product.categories);
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Kategorileri fetch et
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);
  
  // Taze Gıda ve Paketli Gıda kategorilerini ayır
  const tazeCategories = categories.filter(cat => cat.category_type === 'taze');
  const paketliCategories = categories.filter(cat => cat.category_type === 'paketli' || cat.category_type === 'ev');
  
  // Sepetteki toplam ürün sayısı
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  // NOT: autoLogin artık App.jsx'te çağrılıyor

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    toast.info('Çıkış yapıldı');
    history.push('/');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      history.push(`/shop?filter=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  // Kullanıcı rolünü Türkçe olarak göster
  const getRoleName = (role) => {
    switch (role) {
      case 'customer':
        return 'Müşteri';
      case 'store':
        return 'Mağaza';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  };

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Topbar */}
      <div className={`hidden md:block bg-gradient-to-r from-[#1e2235] to-[#252B42] text-white transition-all duration-300 ${scrolled ? 'py-1.5' : 'py-2.5'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-between items-center">
          {/* Sol - İletişim Bilgileri */}
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:+905551234567" className="flex items-center gap-2 hover:text-[#23A6F0] transition-colors group">
              <span className="p-1.5 rounded-full bg-white/10 group-hover:bg-[#23A6F0]/20 transition-colors">
                <Phone className="w-3 h-3" />
              </span>
              <span className="font-medium">(555) 123 45 67</span>
            </a>
            <span className="text-gray-500">|</span>
            <a href="mailto:info@bandage.com" className="flex items-center gap-2 hover:text-[#23A6F0] transition-colors group">
              <span className="p-1.5 rounded-full bg-white/10 group-hover:bg-[#23A6F0]/20 transition-colors">
                <Mail className="w-3 h-3" />
              </span>
              <span>info@bandage.com</span>
            </a>
          </div>

          {/* Orta - Kampanya Mesajı */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="animate-pulse text-lg">🔥</span>
            <span className="text-sm font-medium">
              Yaz İndirimleri!
            </span>
            <Link to="/shop" className="text-[#23A6F0] hover:text-white text-sm font-bold transition-colors">
              %50'ye Varan Fırsatlar →
            </Link>
          </div>

          {/* Sağ - Sosyal Medya */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-300 hidden xl:block">Takip Et:</span>
            <div className="flex items-center gap-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E1306C] transition-all duration-300 hover:scale-110">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 hover:scale-110">
                <FaYoutube className="w-3.5 h-3.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 hover:scale-110">
                <FaFacebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1DA1F2] transition-all duration-300 hover:scale-110">
                <FaTwitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full bg-white border-b border-gray-100 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#23A6F0] to-[#1e8ed8] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-black text-xl">B</span>
            </div>
            <span className="text-2xl font-black text-slate-800 group-hover:text-[#23A6F0] transition-colors">
              Bandage
            </span>
          </Link>

          {/* Mobile Icons */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
            {user ? (
              <img 
                src={getGravatarUrl(user.email, 32)} 
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-[#23A6F0]"
              />
            ) : (
              <Link to="/login" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-slate-600" />
              </Link>
            )}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-[#23A6F0] to-[#1e8ed8] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {isMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
            </button>
          </div>

        {/* Desktop Menu (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className="px-4 py-2 text-slate-600 hover:text-[#23A6F0] hover:bg-blue-50 rounded-lg font-medium text-sm transition-all duration-200">
            Ana Sayfa
          </Link>
          
          {/* Shop Dropdown Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
              onMouseEnter={() => setIsShopMenuOpen(true)}
              className="px-4 py-2 text-slate-600 hover:text-[#23A6F0] hover:bg-blue-50 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-1"
            >
              Mağaza <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isShopMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Category Dropdown */}
            {isShopMenuOpen && (
              <div 
                className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50 min-w-[540px]"
                onMouseLeave={() => setIsShopMenuOpen(false)}
              >
                <div className="flex">
                  {/* Taze Gıda Kategorileri */}
                  <div className="flex-1 px-6 border-r border-gray-100">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center text-sm">🥬</span>
                      Taze Gıda
                    </h3>
                    <ul className="space-y-1">
                      {tazeCategories.map(category => (
                        <li key={category.id}>
                          <Link 
                            to={`/shop/taze/${category.code}/${category.id}`}
                            className="text-gray-600 hover:text-[#23A6F0] hover:bg-blue-50 text-sm block py-1.5 px-2 rounded-lg transition-all duration-200"
                            onClick={() => setIsShopMenuOpen(false)}
                          >
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Paketli Gıda Kategorileri */}
                  <div className="flex-1 px-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center text-sm">📦</span>
                      Paketli Gıda & Ev
                    </h3>
                    <ul className="space-y-1">
                      {paketliCategories.map(category => (
                        <li key={category.id}>
                          <Link 
                            to={`/shop/paketli/${category.code}/${category.id}`}
                            className="text-gray-600 hover:text-[#23A6F0] hover:bg-blue-50 text-sm block py-1.5 px-2 rounded-lg transition-all duration-200"
                            onClick={() => setIsShopMenuOpen(false)}
                          >
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Tümünü Gör */}
                <div className="mt-4 pt-4 border-t border-gray-100 px-6">
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-[#23A6F0] to-[#1e8ed8] hover:from-[#1e8ed8] hover:to-[#1a7fc4] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={() => setIsShopMenuOpen(false)}
                  >
                    Tüm Ürünleri Gör
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/about" className="px-4 py-2 text-slate-600 hover:text-[#23A6F0] hover:bg-blue-50 rounded-lg font-medium text-sm transition-all duration-200">Hakkımızda</Link>
          <Link to="/team" className="px-4 py-2 text-slate-600 hover:text-[#23A6F0] hover:bg-blue-50 rounded-lg font-medium text-sm transition-all duration-200">Ekibimiz</Link>
          <Link to="/contact" className="px-4 py-2 text-slate-600 hover:text-[#23A6F0] hover:bg-blue-50 rounded-lg font-medium text-sm transition-all duration-200">İletişim</Link>
        </nav>

        {/* Desktop Icons (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors text-slate-600 hover:text-[#23A6F0]"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Search Dropdown */}
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün ara..."
                    className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:border-transparent text-sm"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#23A6F0]">
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
          
          {/* Wishlist */}
          <Link to="/wishlist" className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors text-slate-600 hover:text-[#23A6F0] relative">
            <Heart className="w-5 h-5" />
          </Link>
          
          {/* Cart */}
          <Link to="/cart" className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors text-slate-600 hover:text-[#23A6F0] relative group">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-[#23A6F0] to-[#1e8ed8] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <div className="w-px h-6 bg-gray-200 mx-2"></div>
          
          {user ? (
            // Kullanıcı giriş yapmışsa
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg py-1.5 px-3 transition-colors"
              >
                <img 
                  src={getGravatarUrl(user.email, 32)} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-[#23A6F0] shadow-sm"
                />
                <span className="max-w-[120px] truncate text-slate-700 font-medium text-sm">{user.name}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <div className="px-4 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img 
                        src={getGravatarUrl(user.email, 48)} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-[#23A6F0] shadow-sm"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#23A6F0]/10 text-[#23A6F0] text-xs rounded-full font-medium">
                          {getRoleName(user.role)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profilim
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Siparişlerim
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                    Favorilerim
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                    Çıkış Yap
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Kullanıcı giriş yapmamışsa
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-[#23A6F0] hover:bg-blue-50 rounded-lg font-medium text-sm transition-all duration-200"
              >
                <User className="w-4 h-4" />
                Giriş Yap
              </Link>
              <Link 
                to="/signup" 
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#23A6F0] to-[#1e8ed8] text-white rounded-lg font-medium text-sm hover:from-[#1e8ed8] hover:to-[#1a7fc4] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:border-transparent text-sm"
              autoFocus
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#23A6F0]">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white w-full flex flex-col items-center gap-0 py-4 text-slate-600 font-medium text-base shadow-xl absolute top-full left-0 z-40 max-h-[80vh] overflow-y-auto border-t border-gray-100">
          <Link to="/" className="w-full text-center py-3 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors" onClick={toggleMenu}>Ana Sayfa</Link>
          
          {/* Mobile Shop Accordion */}
          <div className="w-full">
            <button 
              onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
              className="w-full text-center py-3 hover:bg-blue-50 hover:text-[#23A6F0] flex items-center justify-center gap-2 transition-colors"
            >
              Mağaza <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isShopMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isShopMenuOpen && (
              <div className="bg-gray-50 py-4 px-6 space-y-4">
                {/* Taze Gıda */}
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center text-sm">🥬</span>
                    Taze Gıda
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tazeCategories.map(category => (
                      <Link 
                        key={category.id}
                        to={`/shop/taze/${category.code}/${category.id}`}
                        className="text-sm bg-white text-slate-600 px-3 py-1.5 rounded-lg hover:bg-green-100 hover:text-green-700 shadow-sm transition-all"
                        onClick={toggleMenu}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Paketli Gıda */}
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center text-sm">📦</span>
                    Paketli Gıda & Ev
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {paketliCategories.map(category => (
                      <Link 
                        key={category.id}
                        to={`/shop/paketli/${category.code}/${category.id}`}
                        className="text-sm bg-white text-slate-600 px-3 py-1.5 rounded-lg hover:bg-orange-100 hover:text-orange-700 shadow-sm transition-all"
                        onClick={toggleMenu}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to="/shop" 
                  className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-[#23A6F0] to-[#1e8ed8] px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                  onClick={toggleMenu}
                >
                  Tüm Ürünleri Gör →
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/about" className="w-full text-center py-3 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors" onClick={toggleMenu}>Hakkımızda</Link>
          <Link to="/team" className="w-full text-center py-3 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors" onClick={toggleMenu}>Ekibimiz</Link>
          <Link to="/contact" className="w-full text-center py-3 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors" onClick={toggleMenu}>İletişim</Link>
          
          {user ? (
            <div className="w-full border-t border-gray-200 mt-2 pt-4 px-6">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={getGravatarUrl(user.email, 48)} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-[#23A6F0] shadow-sm"
                />
                <div>
                  <span className="text-slate-800 font-bold block">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link 
                  to="/profile" 
                  className="flex-1 text-center py-2 bg-gray-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  onClick={toggleMenu}
                >
                  Profilim
                </Link>
                <button 
                  onClick={() => { handleLogout(); toggleMenu(); }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full border-t border-gray-200 mt-2 pt-4 px-6 flex gap-3">
              <Link 
                to="/login" 
                className="flex-1 text-center py-2.5 border border-[#23A6F0] text-[#23A6F0] rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors" 
                onClick={toggleMenu}
              >
                Giriş Yap
              </Link>
              <Link 
                to="/signup" 
                className="flex-1 text-center py-2.5 bg-gradient-to-r from-[#23A6F0] to-[#1e8ed8] text-white rounded-lg text-sm font-medium hover:from-[#1e8ed8] hover:to-[#1a7fc4] transition-all shadow-sm" 
                onClick={toggleMenu}
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </nav>
      )}
      
      {/* Overlay for closing menus */}
      {(isUserMenuOpen || isShopMenuOpen || searchOpen) && (
        <div 
          className="fixed inset-0 z-30 bg-black/5" 
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsShopMenuOpen(false);
            setSearchOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;