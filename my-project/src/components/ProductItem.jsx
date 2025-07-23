import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="block group">
      {/* Image container */}
      <div className="w-full aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-sm">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product text */}
      <div className="mt-2 px-0.5">
        <h3 className="text-sm md:text-base text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-sm text-gray-700 font-semibold">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
