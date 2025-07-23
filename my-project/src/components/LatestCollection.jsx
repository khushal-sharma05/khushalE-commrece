import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className='my-13'>
      <div className='text-center py-8 text-3xl'>
        <div className='my-4 gap-2'>
          <Title text1={'LATEST'} text2={'COLLECTION'} />
        </div>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, at aut vitae rerum voluptas et ipsa eveniet magni qui ullam unde accusamus exercitationem perspiciatis possimus incidunt fugiat esse? Porro, at.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              images={item.images} 
              name={item.name}
              price={item.price}
            />
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
