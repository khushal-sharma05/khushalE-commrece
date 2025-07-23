import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuatity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >
              {/* Product Info */}
              <div className='flex items-start gap-6'>
                <img
                  className='w-16 sm:w-20'
                  src={productData.images?.[0]}
                  alt={productData.name}
                />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <p className='text-sm text-gray-500'>Size: {item.size}</p>
                  <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                </div>
              </div>

              {/* Price */}
              <div className='text-sm sm:text-base font-medium'>
                {currency} {productData.price}
              </div>

              {/* Total + Delete */}
              <div className='text-sm sm:text-base font-semibold flex items-center gap-2'>
                {currency} {(productData.price * item.quantity).toFixed(2)}
                <img
                  onClick={() => updateQuatity(item._id, item.size, 0)}
                  className='w-4 sm:w-5 cursor-pointer'
                  src={assets.bin_icon}
                  alt='Delete'
                />
              </div>
            </div>
          );
        })}
      </div>

      <CartTotal />
    </div>
  );
};

export default Cart;
