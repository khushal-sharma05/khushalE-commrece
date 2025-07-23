import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (
      products &&
      Array.isArray(products) &&
      category &&
      subCategory &&
      products.length > 0
    ) {
      // 🪵 Debug log
      console.log(" Related Products Filter Input:", { category, subCategory });

      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) =>
          item.category?.toLowerCase() === category.toLowerCase() &&
          item.subcategory?.toLowerCase() === subCategory.toLowerCase()
      );

      console.log(" Filtered Related Products:", productsCopy);

      setRelated(productsCopy.slice(0, 5)); // Show top 5
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            images={item.images || []}
            sizes={item.sizes || []}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
