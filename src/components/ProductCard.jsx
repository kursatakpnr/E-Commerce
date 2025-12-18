import React from 'react';
import { Link } from 'react-router-dom';

// Ürün adından URL slug oluştur
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const ProductCard = ({ id, image, title, department, originalPrice, price, colors, categoryId, gender, categoryName }) => {
  // URL oluştur
  const productSlug = createSlug(title);
  const productUrl = gender && categoryName && categoryId 
    ? `/shop/${gender}/${categoryName}/${categoryId}/${productSlug}/${id}`
    : `/product/${id}`;

  const cardContent = (
    <>
      <div className="w-full aspect-square overflow-hidden mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
      </div>
      <h3 className="text-slate-800 font-bold text-base mb-1 group-hover:text-blue-500 transition-colors">{title}</h3>
      <p className="text-slate-500 text-sm mb-2">{department}</p>
      <div className="flex gap-2">
        <span className="text-slate-400 font-bold line-through">{originalPrice}</span>
        <span className="text-green-600 font-bold">{price}</span>
      </div>
      {colors && (
        <div className="flex gap-1 mt-2">
          {colors.map((color, index) => (
            <div key={index} className={`w-4 h-4 rounded-full ${color}`}></div>
          ))}
        </div>
      )}
    </>
  );

  if (id) {
    return (
      <Link 
        to={productUrl} 
        className="group flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white">
      {cardContent}
    </div>
  );
};

export default ProductCard;
