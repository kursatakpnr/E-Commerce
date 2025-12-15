import React, { useState } from 'react';
import { ChevronDown, Grid, List, ChevronRight, Leaf } from 'lucide-react';
import { FaAws, FaRedditAlien, FaLyft, FaStripe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import card1 from '../assets/card-1.jpg';
import card2 from '../assets/card-2.jpg';
import card3 from '../assets/card-3.png';
import best1 from '../assets/best-1.png';
import best2 from '../assets/best-2.jpg';
import best3 from '../assets/best-3.jpg';
import best4 from '../assets/best-4.jpg';

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  
  // Sample products data - Food theme
  const products = [
    { id: 1, image: card1, title: "Caramel Cone Ice Cream", department: "Frozen Desserts", originalPrice: "$8.99", price: "$5.99" },
    { id: 2, image: card2, title: "Fresh Green Apples", department: "Fruits & Vegetables", originalPrice: "$4.99", price: "$2.99" },
    { id: 3, image: card3, title: "Premium Smoked Ham", department: "Deli & Meat", originalPrice: "$24.99", price: "$18.99" },
    { id: 4, image: best1, title: "Kids Water Bottle", department: "Kitchen Accessories", originalPrice: "$12.99", price: "$8.99" },
    { id: 5, image: best2, title: "Gourmet Meat Platter", department: "Deli & Meat", originalPrice: "$32.99", price: "$24.99" },
    { id: 6, image: best3, title: "Organic Bleach", department: "Cleaning Supplies", originalPrice: "$6.99", price: "$4.49" },
    { id: 7, image: best4, title: "Werther's Caramel", department: "Snacks & Candy", originalPrice: "$5.99", price: "$3.99" },
    { id: 8, image: card1, title: "Häagen-Dazs Vanilla", department: "Frozen Desserts", originalPrice: "$9.99", price: "$6.99" },
    { id: 9, image: card2, title: "Organic Granny Smith", department: "Fruits & Vegetables", originalPrice: "$5.99", price: "$3.49" },
    { id: 10, image: card3, title: "Honey Glazed Ham", department: "Deli & Meat", originalPrice: "$28.99", price: "$21.99" },
    { id: 11, image: best1, title: "Whale Sippy Cup", department: "Kitchen Accessories", originalPrice: "$14.99", price: "$9.99" },
    { id: 12, image: best2, title: "BBQ Ribs Platter", department: "Deli & Meat", originalPrice: "$29.99", price: "$22.99" },
  ];

  // Categories for the grid - Food theme
  const categories = [
    { id: 1, name: "FROZEN", items: 12, image: card1 },
    { id: 2, name: "FRUITS", items: 24, image: card2 },
    { id: 3, name: "MEAT & DELI", items: 18, image: card3 },
    { id: 4, name: "SNACKS", items: 32, image: best4 },
    { id: 5, name: "BEVERAGES", items: 15, image: best1 },
  ];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb Section */}
      <section className="bg-gray-50 py-6 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-slate-800 font-bold text-2xl">Shop</h1>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-800 font-bold hover:text-blue-500">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 font-bold">Shop</span>
          </nav>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="relative h-48 md:h-64 rounded-lg overflow-hidden group cursor-pointer"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-sm">{category.items} Items</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 px-4 md:px-8 lg:px-16 xl:px-24 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Results Count */}
          <p className="text-slate-500 text-sm font-bold">Showing all 12 results</p>
          
          {/* View Mode & Filters */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-sm hidden sm:block">Views:</span>
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

            {/* Sort Dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-slate-600 text-sm hover:border-gray-400">
                <span>Popularity</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Button */}
            <button className="bg-blue-500 text-white font-bold py-2 px-5 rounded text-sm hover:bg-blue-600 transition-colors">
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              department={product.department}
              originalPrice={product.originalPrice}
              price={product.price}
              colors={['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-slate-800']}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-1">
            <button className="px-4 py-2 border border-gray-300 rounded-l-lg text-slate-400 hover:bg-gray-50 text-sm font-bold">
              First
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-300 text-slate-600 hover:bg-gray-50 text-sm font-bold">
              1
            </button>
            <button className="px-4 py-2 border border-blue-500 bg-blue-500 text-white text-sm font-bold">
              2
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-300 text-slate-600 hover:bg-gray-50 text-sm font-bold">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-r-lg text-blue-500 hover:bg-gray-50 text-sm font-bold">
              Next
            </button>
          </nav>
        </div>
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
