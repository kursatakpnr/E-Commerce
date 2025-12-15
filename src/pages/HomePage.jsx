import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard';
import { ChevronRight, ChevronLeft, Leaf, BarChart2, Calendar } from 'lucide-react';
import { FaAws, FaRedditAlien, FaLyft, FaStripe } from 'react-icons/fa';
import headerImg from '../assets/header.jpg';
import card1 from '../assets/card-1.jpg';
import card2 from '../assets/card-2.jpg';
import card3 from '../assets/card-3.png';
import bestSellerLeft from '../assets/best-seller-left.jpg';
import bestSellerRight from '../assets/best-seller-right.jpg';
import mostPopularLeft from '../assets/most-popular-left.jpg';
import mostPopularRight from '../assets/most-popular-right.jpg';
import mostPopularLeft2 from '../assets/most-popular-left-2.jpg';
import mostPopularRight2 from '../assets/most-popular-right-2.jpg';
import best1 from '../assets/best-1.png';
import best2 from '../assets/best-2.jpg';
import best3 from '../assets/best-3.jpg';
import best4 from '../assets/best-4.jpg';
import featured1 from '../assets/featured-1.jpg';
import featured2 from '../assets/featured-2.jpg';
import featured3 from '../assets/featured-3.jpg';

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white hover:text-gray-200 transition-colors"
  >
    <ChevronLeft className="w-10 h-10" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white hover:text-gray-200 transition-colors"
  >
    <ChevronRight className="w-10 h-10" />
  </button>
);

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  dotsClass: "slick-dots !bottom-8",
};

const HomePage = () => {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero Slider */}
      <section className="w-full relative">
        <Slider {...sliderSettings}>
          {/* Slide 1 */}
          <div className="relative w-full h-[500px] md:h-[600px] text-white overflow-hidden">
             {/* Background Image */}
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${headerImg})` }}></div>
             
             <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-6 px-8">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">GROCERIES DELIVERY</h1>
                <div className="flex items-center gap-2">
                  <span className="w-16 md:w-24 h-px bg-white/50"></span>
                  <span className="text-blue-400">✦</span>
                  <span className="w-16 md:w-24 h-px bg-white/50"></span>
                </div>
                <p className="text-base md:text-lg max-w-md">We know how large objects will act, but things on a small scale just do not act that way.</p>
                <button className="bg-blue-500 text-white font-bold py-3 px-10 rounded-md hover:bg-blue-600 transition-colors mt-2">
                    Start Now
                </button>
             </div>
          </div>
          {/* Slide 2 */}
          <div className="relative w-full h-[500px] md:h-[600px] text-white overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
             <div className="absolute inset-0 bg-green-700/60"></div>
             <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-6 px-8">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">VEGETABLES & FRUITS</h1>
                <div className="flex items-center gap-2">
                  <span className="w-16 md:w-24 h-px bg-white/50"></span>
                  <span className="text-blue-400">✦</span>
                  <span className="w-16 md:w-24 h-px bg-white/50"></span>
                </div>
                <p className="text-base md:text-lg max-w-md">Fresh from the farm to your door.</p>
                <button className="bg-blue-500 text-white font-bold py-3 px-10 rounded-md hover:bg-blue-600 transition-colors mt-2">
                    Order Now
                </button>
             </div>
          </div>
        </Slider>
      </section>

      {/* Categories / Banners */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="flex flex-col md:flex-row gap-4">
            {/* Card 1 */}
            <div className="bg-white flex-1 flex justify-between items-center shadow-sm border border-gray-100 rounded-lg overflow-hidden">
                <div className="pl-4 sm:pl-8 py-6 sm:py-8 flex flex-col gap-2 items-start text-left">
                    <h5 className="text-red-500 font-bold text-xs sm:text-sm">Your Space</h5>
                    <h2 className="text-slate-800 font-bold text-xl sm:text-2xl">Unique Life</h2>
                    <a href="#" className="text-slate-800 font-bold text-xs sm:text-sm mt-2">Explore Items</a>
                </div>
                <div className="w-1/2 h-full flex items-end justify-end">
                    <img src={card1} alt="Ice Cream" className="max-h-32 sm:max-h-48 object-contain" />
                </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white flex-1 flex justify-between items-center shadow-sm border border-gray-100 rounded-lg overflow-hidden">
                <div className="pl-4 sm:pl-8 py-6 sm:py-8 flex flex-col gap-2 items-start text-left">
                    <h5 className="text-slate-400 font-bold text-xs sm:text-sm">Ends Today</h5>
                    <h2 className="text-slate-800 font-bold text-xl sm:text-2xl">Elements Style</h2>
                    <a href="#" className="text-slate-800 font-bold text-xs sm:text-sm mt-2">Explore Items</a>
                </div>
                <div className="w-1/2 h-full flex items-end justify-end">
                    <img src={card2} alt="Apples" className="max-h-32 sm:max-h-48 object-contain" />
                </div>
            </div>
             {/* Card 3 */}
             <div className="bg-white flex-1 flex justify-between items-center shadow-sm border border-gray-100 rounded-lg overflow-hidden">
                <div className="pl-4 sm:pl-8 py-6 sm:py-8 flex flex-col gap-2 items-start text-left">
                    <h5 className="text-slate-400 font-bold text-xs sm:text-sm">Ends Today</h5>
                    <h2 className="text-slate-800 font-bold text-xl sm:text-2xl">Elements Style</h2>
                    <a href="#" className="text-slate-800 font-bold text-xs sm:text-sm mt-2">Explore Items</a>
                </div>
                <div className="w-1/2 h-full flex items-end justify-end">
                    <img src={card3} alt="Meat" className="max-h-32 sm:max-h-48 object-contain" />
                </div>
            </div>
        </div>
      </section>

      {/* Bestseller Products Section - Split Layout */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Featured Banner */}
          <div className="lg:w-1/3 relative overflow-hidden rounded-lg min-h-[500px]">
            <div className="absolute inset-0 bg-yellow-400">
              <img 
                src={bestSellerLeft} 
                alt="Featured Product" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 p-8 flex flex-col gap-2">
              <h5 className="text-white font-bold text-sm tracking-wide">FURNITURE</h5>
              <h2 className="text-white font-bold text-2xl">5 Items</h2>
            </div>
          </div>

          {/* Right Side - Bestseller Products */}
          <div className="lg:w-2/3">
            {/* Header with tabs and arrows */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <h2 className="text-slate-800 font-bold text-xl">BESTSELLER PRODUCTS</h2>
                <nav className="flex gap-4">
                  <button className="text-blue-500 font-medium hover:text-blue-600 text-sm sm:text-base">Men</button>
                  <button className="text-slate-500 font-medium hover:text-slate-700 text-sm sm:text-base">Women</button>
                  <button className="text-slate-500 font-medium hover:text-slate-700 text-sm sm:text-base">Accessories</button>
                </nav>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Products Grid - 3x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <ProductCard 
                  key={item}
                  id={item}
                  image={item <= 2 ? card1 : item <= 4 ? card2 : card3}
                  title="Graphic Design"
                  department="English Department"
                  originalPrice="$16.48"
                  price="$6.48"
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Most Popular / Features */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-12">
         {/* Top Section - Image and Info */}
         <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left Side - Image with purple background */}
            <div className="w-full lg:w-1/2 bg-purple-200 rounded-lg overflow-hidden min-h-[300px] md:min-h-[400px] flex items-end justify-center">
                <img 
                  src={mostPopularLeft} 
                  alt="Delivery man on scooter" 
                  className="w-full h-full object-cover object-center" 
                />
            </div>
            
            {/* Right Side - Most Popular Info */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center gap-4 py-8">
                <h2 className="text-slate-800 font-bold text-2xl">MOST POPULAR</h2>
                <p className="text-slate-500 max-w-sm">
                  We focus on ergonomics and meeting you where you work. It's only a keystroke away.
                </p>
                
                {/* Product Card */}
                <div className="mt-4">
                  <div className="w-48 h-48 mx-auto mb-4">
                    <img 
                      src={mostPopularRight} 
                      alt="Product" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-slate-700 font-bold text-sm">English Department</p>
                  <div className="flex gap-2 justify-center mt-1">
                    <span className="text-slate-400 line-through text-sm">$16.48</span>
                    <span className="text-green-600 font-bold text-sm">$6.48</span>
                  </div>
                </div>
            </div>
         </div>
         
         {/* Bottom Section - Features Row */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-8 border-t border-gray-100">
            <div className="flex gap-4 items-start">
                <h3 className="text-red-500 font-bold text-xl">1.</h3>
                <div>
                    <h4 className="text-slate-800 font-bold text-sm">Easy to use</h4>
                    <p className="text-slate-500 text-xs">Things on a very small that you have any direct</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <h3 className="text-red-500 font-bold text-xl">2.</h3>
                <div>
                    <h4 className="text-slate-800 font-bold text-sm">Easy to use</h4>
                    <p className="text-slate-500 text-xs">Things on a very small that you have any direct</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <h3 className="text-red-500 font-bold text-xl">3.</h3>
                <div>
                    <h4 className="text-slate-800 font-bold text-sm">Easy to use</h4>
                    <p className="text-slate-500 text-xs">Things on a very small that you have any direct</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <h3 className="text-red-500 font-bold text-xl">4.</h3>
                <div>
                    <h4 className="text-slate-800 font-bold text-sm">Easy to use</h4>
                    <p className="text-slate-500 text-xs">Things on a very small that you have any direct</p>
                </div>
            </div>
         </div>
      </section>

      {/* Bestseller Products Section 2 - Image on Right */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Bestseller Products */}
          <div className="lg:w-2/3">
            {/* Header with tabs and arrows */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex flex-wrap items-center gap-4 md:gap-8">
                <h2 className="text-slate-800 font-bold text-xl">BESTSELLER PRODUCTS</h2>
                <nav className="flex gap-4">
                  <button className="text-blue-500 font-medium hover:text-blue-600">Men</button>
                  <button className="text-slate-500 font-medium hover:text-slate-700">Women</button>
                  <button className="text-slate-500 font-medium hover:text-slate-700">Accessories</button>
                </nav>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Products Grid - 3x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <ProductCard 
                  key={item}
                  id={item + 6}
                  image={item % 3 === 1 ? card1 : item % 3 === 2 ? card2 : card3}
                  title="Graphic Design"
                  department="English Department"
                  originalPrice="$16.48"
                  price="$6.48"
                />
              ))}
            </div>
          </div>

          {/* Right Side - Featured Banner */}
          <div className="lg:w-1/3 relative overflow-hidden rounded-lg min-h-[500px]">
            <div className="absolute inset-0">
              <img 
                src={bestSellerRight} 
                alt="Featured Product" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 p-8 flex flex-col gap-2">
              <h5 className="text-slate-800 font-bold text-sm tracking-wide">FURNITURE</h5>
              <h2 className="text-slate-800 font-bold text-2xl">5 Items</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Section 2 - Image on Right */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Side - Most Popular Info */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center gap-4 py-8 bg-gray-50 rounded-lg">
            <h2 className="text-slate-800 font-bold text-2xl">MOST POPULAR</h2>
            <p className="text-slate-500 max-w-sm text-sm">
              We focus on ergonomics and meeting you where you work. It's only a keystroke away.
            </p>
            
            {/* Product Card */}
            <div className="mt-4">
              <div className="w-40 h-48 mx-auto mb-4">
                <img 
                  src={mostPopularLeft2} 
                  alt="Product" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-slate-700 font-bold text-sm">English Department</p>
              <div className="flex items-center justify-center gap-2 mt-1 text-slate-500 text-xs">
                <span>📥</span>
                <span>15 Sales</span>
              </div>
              <div className="flex gap-2 justify-center mt-2">
                <span className="text-slate-400 line-through text-sm">$16.48</span>
                <span className="text-green-600 font-bold text-sm">$6.48</span>
              </div>
              {/* Color Options */}
              <div className="flex gap-2 justify-center mt-3">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <div className="w-4 h-4 rounded-full bg-slate-800"></div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 rounded-lg overflow-hidden min-h-[500px]">
            <img 
              src={mostPopularRight2} 
              alt="Woman eating burger" 
              className="w-full h-full object-cover object-center" 
            />
          </div>
        </div>
      </section>

      {/* Bestseller Products - Full Width */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-12">
        <h2 className="text-slate-800 font-bold text-xl mb-8">BESTSELLER PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard 
            id={13}
            image={best1}
            title="Graphic Design"
            department="English Department"
            originalPrice="$16.48"
            price="$6.48"
          />
          <ProductCard 
            id={14}
            image={best2}
            title="Graphic Design"
            department="English Department"
            originalPrice="$16.48"
            price="$6.48"
          />
          <ProductCard 
            id={15}
            image={best3}
            title="Graphic Design"
            department="English Department"
            originalPrice="$16.48"
            price="$6.48"
          />
          <ProductCard 
            id={16}
            image={best4}
            title="Graphic Design"
            department="English Department"
            originalPrice="$16.48"
            price="$6.48"
          />
        </div>
      </section>

      {/* Brands / Clients Section */}
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

      {/* Featured Posts Section */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-blue-500 font-bold text-sm mb-2">Practice Advice</p>
          <h2 className="text-slate-800 font-bold text-3xl md:text-4xl">Featured Posts</h2>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Post Card 1 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="relative">
              <img src={featured1} alt="Featured Post" className="w-full h-64 object-cover" />
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">NEW</span>
            </div>
            <div className="p-6">
              <div className="flex gap-4 text-sm mb-3">
                <span className="text-blue-400">Google</span>
                <span className="text-slate-600">Trending</span>
                <span className="text-slate-600">New</span>
              </div>
              <h3 className="text-slate-800 font-bold text-xl mb-3">Loudest à la Madison #1 (L'integral)</h3>
              <p className="text-slate-500 text-sm mb-4">We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
              <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>22 April 2021</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart2 className="w-4 h-4" />
                  <span>10 comments</span>
                </div>
              </div>
              <a href="#" className="text-slate-700 font-bold text-sm flex items-center gap-2 hover:text-blue-500">
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Post Card 2 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="relative">
              <img src={featured2} alt="Featured Post" className="w-full h-64 object-cover" />
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">NEW</span>
            </div>
            <div className="p-6">
              <div className="flex gap-4 text-sm mb-3">
                <span className="text-blue-400">Google</span>
                <span className="text-slate-600">Trending</span>
                <span className="text-slate-600">New</span>
              </div>
              <h3 className="text-slate-800 font-bold text-xl mb-3">Loudest à la Madison #1 (L'integral)</h3>
              <p className="text-slate-500 text-sm mb-4">We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
              <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>22 April 2021</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart2 className="w-4 h-4" />
                  <span>10 comments</span>
                </div>
              </div>
              <a href="#" className="text-slate-700 font-bold text-sm flex items-center gap-2 hover:text-blue-500">
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Post Card 3 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="relative">
              <img src={featured3} alt="Featured Post" className="w-full h-64 object-cover" />
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">NEW</span>
            </div>
            <div className="p-6">
              <div className="flex gap-4 text-sm mb-3">
                <span className="text-blue-400">Google</span>
                <span className="text-slate-600">Trending</span>
                <span className="text-slate-600">New</span>
              </div>
              <h3 className="text-slate-800 font-bold text-xl mb-3">Loudest à la Madison #1 (L'integral)</h3>
              <p className="text-slate-500 text-sm mb-4">We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
              <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>22 April 2021</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart2 className="w-4 h-4" />
                  <span>10 comments</span>
                </div>
              </div>
              <a href="#" className="text-slate-700 font-bold text-sm flex items-center gap-2 hover:text-blue-500">
                Learn More <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
