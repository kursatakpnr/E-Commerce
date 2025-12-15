import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, title, department, originalPrice, price, colors }) => {
  const cardContent = (
    <>
      <div className="w-full aspect-square overflow-hidden mb-4 flex items-center justify-center">
        <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
      </div>
      <h3 className="text-slate-800 font-bold text-base mb-1">{title}</h3>
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
      <Link to={`/product/${id}`} className="flex flex-col items-center p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer">
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
