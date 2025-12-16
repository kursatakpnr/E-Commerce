import React, { useState, useEffect } from 'react';
import { User, Search, ShoppingCart, Menu, X, Heart, ChevronDown, LogOut } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/clientActions';
import { fetchCategories } from '../store/actions/productActions';
import { getGravatarUrl } from '../utils/gravatar';
import { toast } from 'react-toastify';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Redux'tan kullanıcı bilgisini al
  const user = useSelector((state) => state.client.user);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const categories = useSelector((state) => state.product.categories);
  
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
    <header className="w-full bg-white shadow-sm relative z-50">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-slate-800">
          Bandage
        </Link>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {user ? (
            <img 
              src={getGravatarUrl(user.email, 32)} 
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-[#23A6F0]"
            />
          ) : (
            <Link to="/login">
              <User className="w-6 h-6 text-slate-600" />
            </Link>
          )}
          <Search className="w-6 h-6 text-slate-600" />
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-slate-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
          </button>
        </div>

        {/* Desktop Menu (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-6 text-slate-600 font-bold text-sm">
          <Link to="/" className="hover:text-slate-900">Ana Sayfa</Link>
          
          {/* Shop Dropdown Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
              onMouseEnter={() => setIsShopMenuOpen(true)}
              className="hover:text-slate-900 flex items-center gap-1"
            >
              Mağaza <ChevronDown className={`w-4 h-4 transition-transform ${isShopMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Category Dropdown */}
            {isShopMenuOpen && (
              <div 
                className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50 min-w-[500px]"
                onMouseLeave={() => setIsShopMenuOpen(false)}
              >
                <div className="flex">
                  {/* Taze Gıda Kategorileri */}
                  <div className="flex-1 px-6 border-r border-gray-100">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Taze Gıda
                    </h3>
                    <ul className="space-y-2">
                      {tazeCategories.map(category => (
                        <li key={category.id}>
                          <Link 
                            to={`/shop/taze/${category.code}/${category.id}`}
                            className="text-gray-600 hover:text-[#23A6F0] text-sm block py-1 transition-colors"
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
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Paketli Gıda & Ev
                    </h3>
                    <ul className="space-y-2">
                      {paketliCategories.map(category => (
                        <li key={category.id}>
                          <Link 
                            to={`/shop/paketli/${category.code}/${category.id}`}
                            className="text-gray-600 hover:text-[#23A6F0] text-sm block py-1 transition-colors"
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
                    className="text-[#23A6F0] hover:text-blue-600 text-sm font-medium"
                    onClick={() => setIsShopMenuOpen(false)}
                  >
                    Tüm Ürünleri Gör →
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/about" className="hover:text-slate-900">Hakkımızda</Link>
          <Link to="/team" className="hover:text-slate-900">Ekibimiz</Link>
          <Link to="/contact" className="hover:text-slate-900">İletişim</Link>
        </nav>

        {/* Desktop Icons (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-6 text-blue-500 font-bold text-sm">
          {user ? (
            // Kullanıcı giriş yapmışsa
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
              >
                <img 
                  src={getGravatarUrl(user.email, 32)} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-[#23A6F0]"
                />
                <span className="max-w-[120px] truncate">{user.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                      {getRoleName(user.role)}
                    </span>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profilim
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Siparişlerim
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Kullanıcı giriş yapmamışsa
            <>
              <Link to="/login" className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                <User className="w-4 h-4" />
                <span>Giriş</span>
              </Link>
              <span className="text-slate-400">/</span>
              <Link to="/signup" className="cursor-pointer hover:text-blue-600">
                <span>Kayıt</span>
              </Link>
            </>
          )}
          <Search className="w-4 h-4 cursor-pointer hover:text-blue-600" />
          <Link to="/cart" className="flex items-center gap-1 cursor-pointer hover:text-blue-600 relative">
            <ShoppingCart className="w-4 h-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
            <Heart className="w-4 h-4" />
            <span className="text-xs">0</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white w-full flex flex-col items-center gap-6 py-8 text-slate-500 font-normal text-xl shadow-lg absolute top-full left-0 z-40 max-h-[80vh] overflow-y-auto">
          <Link to="/" className="hover:text-slate-900" onClick={toggleMenu}>Ana Sayfa</Link>
          
          {/* Mobile Shop Accordion */}
          <div className="w-full px-8">
            <button 
              onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
              className="w-full text-center hover:text-slate-900 flex items-center justify-center gap-2"
            >
              Mağaza <ChevronDown className={`w-5 h-5 transition-transform ${isShopMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isShopMenuOpen && (
              <div className="mt-4 space-y-4">
                {/* Taze Gıda */}
                <div>
                  <h4 className="text-sm font-bold text-green-500 mb-2 text-center">🥬 Taze Gıda</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {tazeCategories.map(category => (
                      <Link 
                        key={category.id}
                        to={`/shop/taze/${category.code}/${category.id}`}
                        className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100"
                        onClick={toggleMenu}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Paketli Gıda */}
                <div>
                  <h4 className="text-sm font-bold text-orange-500 mb-2 text-center">📦 Paketli Gıda & Ev</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {paketliCategories.map(category => (
                      <Link 
                        key={category.id}
                        to={`/shop/paketli/${category.code}/${category.id}`}
                        className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-100"
                        onClick={toggleMenu}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to="/shop" 
                  className="block text-center text-[#23A6F0] text-sm font-medium"
                  onClick={toggleMenu}
                >
                  Tüm Ürünleri Gör →
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/about" className="hover:text-slate-900" onClick={toggleMenu}>Hakkımızda</Link>
          <Link to="/team" className="hover:text-slate-900" onClick={toggleMenu}>Ekibimiz</Link>
          <Link to="/contact" className="hover:text-slate-900" onClick={toggleMenu}>İletişim</Link>
          
          {user ? (
            <>
              <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-200 w-full">
                <img 
                  src={getGravatarUrl(user.email, 64)} 
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-[#23A6F0]"
                />
                <span className="text-slate-800 font-bold">{user.name}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
              <button 
                onClick={() => { handleLogout(); toggleMenu(); }}
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[#23A6F0] hover:text-blue-600" onClick={toggleMenu}>Giriş Yap</Link>
              <Link to="/signup" className="text-[#23A6F0] hover:text-blue-600" onClick={toggleMenu}>Kayıt Ol</Link>
            </>
          )}
        </nav>
      )}
      
      {/* Overlay for closing menus */}
      {(isUserMenuOpen || isShopMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsShopMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
