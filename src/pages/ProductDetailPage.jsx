import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Heart, ShoppingCart, Eye, Star, Leaf } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { FaAws, FaRedditAlien, FaLyft, FaStripe } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import card1 from '../assets/card-1.jpg';
import card2 from '../assets/card-2.jpg';
import card3 from '../assets/card-3.png';
import best1 from '../assets/best-1.png';
import best4 from '../assets/best-4.jpg';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  // Sample product data - in real app this would come from API
  const product = {
    id: productId,
    title: "Caramel Cone Ice Cream",
    brand: "Häagen-Dazs",
    rating: 4,
    reviews: 10,
    price: "$5.99",
    originalPrice: "$8.99",
    availability: "In Stock",
    description: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.,,, , , , , ",
    colors: ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-slate-800'],
    images: [card1, card2, card3, best1],
  };

  // Related products
  const relatedProducts = [
    { id: 1, image: card1, title: "Caramel Cone Ice Cream", department: "Frozen Desserts", originalPrice: "$8.99", price: "$5.99" },
    { id: 2, image: card2, title: "Fresh Green Apples", department: "Fruits & Vegetables", originalPrice: "$4.99", price: "$2.99" },
    { id: 3, image: card3, title: "Premium Smoked Ham", department: "Deli & Meat", originalPrice: "$24.99", price: "$18.99" },
    { id: 4, image: best4, title: "Werther's Caramel", department: "Snacks & Candy", originalPrice: "$5.99", price: "$3.99" },
  ];

  const thumbnails = product.images;

  return (
    <div className="flex flex-col">
      {/* Breadcrumb Section */}
      <section className="bg-gray-50 py-4 px-4 md:px-8 lg:px-16 xl:px-24">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-slate-800 font-bold hover:text-blue-500">Home</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link to="/shop" className="text-slate-800 font-bold hover:text-blue-500">Shop</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 font-bold">Product Detail</span>
        </nav>
      </section>

      {/* Product Detail Section */}
      <section className="py-8 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            {/* Main Image with Navigation */}
            <div className="relative bg-white rounded-lg overflow-hidden mb-4">
              <img 
                src={thumbnails[selectedImage]} 
                alt={product.title} 
                className="w-full h-[400px] md:h-[500px] object-contain"
              />
              {/* Navigation Arrows */}
              <button 
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : thumbnails.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              <button 
                onClick={() => setSelectedImage(prev => prev < thumbnails.length - 1 ? prev + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
              >
                <ChevronRight className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4">
              {thumbnails.map((thumb, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-slate-800 font-bold text-2xl mb-2">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-slate-500 text-sm font-bold">{product.reviews} Reviews</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-slate-800 font-bold text-2xl">{product.price}</span>
              <span className="text-slate-400 line-through ml-2">{product.originalPrice}</span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-slate-500 font-bold text-sm">Availability:</span>
              <span className="text-blue-500 font-bold text-sm">{product.availability}</span>
            </div>

            {/* Description */}
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {product.description}
            </p>

            <hr className="mb-6" />

            {/* Color Options */}
            <div className="flex items-center gap-3 mb-8">
              {product.colors.map((color, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 rounded-full ${color} ${selectedColor === index ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-blue-500 text-white font-bold py-3 px-8 rounded hover:bg-blue-600 transition-colors">
                Select Options
              </button>
              <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5 text-slate-600" />
              </button>
              <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <ShoppingCart className="w-5 h-5 text-slate-600" />
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
            Description
          </button>
          <button className="text-slate-800 font-bold text-sm pb-4 border-b-2 border-blue-500">
            Additional Information
          </button>
          <button className="text-slate-500 font-bold text-sm pb-4 border-b-2 border-transparent hover:text-slate-800">
            Reviews <span className="text-green-500">(0)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description Column */}
          <div>
            <h3 className="text-slate-800 font-bold text-xl mb-4">the quick fox jumps over</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. REdistribution programmer.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RERIBUTION original.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            </p>
          </div>

          {/* Additional Info Column */}
          <div>
            <h3 className="text-slate-800 font-bold text-xl mb-4">the quick fox jumps over</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                the quick fox jumps over the lazy dog
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                the quick fox jumps over the lazy dog
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                the quick fox jumps over the lazy dog
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                the quick fox jumps over the lazy dog
              </li>
            </ul>
          </div>

          {/* Reviews Column */}
          <div>
            <h3 className="text-slate-800 font-bold text-xl mb-4">the quick fox jumps over</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                the quick fox jumps over the lazy dog
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                the quick fox jumps over the lazy dog
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                the quick fox jumps over the lazy dog
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <h2 className="text-slate-800 font-bold text-xl mb-8">BESTSELLER PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard 
              key={relatedProduct.id}
              id={relatedProduct.id}
              image={relatedProduct.image}
              title={relatedProduct.title}
              department={relatedProduct.department}
              originalPrice={relatedProduct.originalPrice}
              price={relatedProduct.price}
              colors={['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-slate-800']}
            />
          ))}
        </div>
      </section>

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
