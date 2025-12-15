import React, { useState } from 'react';
import { User, Search, ShoppingCart, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <User className="w-6 h-6 text-slate-600" />
          <Search className="w-6 h-6 text-slate-600" />
          <ShoppingCart className="w-6 h-6 text-slate-600" />
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
          </button>
        </div>

        {/* Desktop Menu (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-6 text-slate-600 font-bold text-sm">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <Link to="/shop" className="hover:text-slate-900 flex items-center gap-1">
            Shop <ChevronDown className="w-4 h-4" />
          </Link>
          <Link to="/about" className="hover:text-slate-900">About</Link>
          <Link to="/team" className="hover:text-slate-900">Team</Link>
          <Link to="/contact" className="hover:text-slate-900">Contact</Link>
        </nav>

        {/* Desktop Icons (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-6 text-blue-500 font-bold text-sm">
            <Link to="/login" className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                <User className="w-4 h-4" />
                <span>Login</span>
            </Link>
            <span className="text-slate-400">/</span>
            <Link to="/signup" className="cursor-pointer hover:text-blue-600">
                <span>Register</span>
            </Link>
            <Search className="w-4 h-4 cursor-pointer hover:text-blue-600" />
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-xs">1</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                <Heart className="w-4 h-4" />
                <span className="text-xs">1</span>
            </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white w-full flex flex-col items-center gap-8 py-20 text-slate-500 font-normal text-3xl shadow-lg absolute top-full left-0 z-40">
          <Link to="/" className="hover:text-slate-900" onClick={toggleMenu}>Home</Link>
          <Link to="/shop" className="hover:text-slate-900" onClick={toggleMenu}>Shop</Link>
          <Link to="/about" className="hover:text-slate-900" onClick={toggleMenu}>About</Link>
          <Link to="/team" className="hover:text-slate-900" onClick={toggleMenu}>Team</Link>
          <Link to="/contact" className="hover:text-slate-900" onClick={toggleMenu}>Contact</Link>
          <Link to="/login" className="text-[#23A6F0] hover:text-blue-600" onClick={toggleMenu}>Login</Link>
          <Link to="/signup" className="text-[#23A6F0] hover:text-blue-600" onClick={toggleMenu}>Register</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
