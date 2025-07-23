import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import { toast } from 'react-toastify'; // ✅ Toastify import
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState([]); // multiple sizes selected

  const fetchProductData = () => {
    const item = products.find((item) => item._id === productId);

    if (item) {
      setProductData(item);

      if (Array.isArray(item.images) && item.images.length > 0) {
        setImage(item.images[0]);
      } else {
        setImage(null);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const toggleSize = (selectedSize) => {
    setSizes((prev) =>
      prev.includes(selectedSize)
        ? prev.filter((s) => s !== selectedSize)
        : [...prev, selectedSize]
    );
  };

  const handleAddToCart = () => {
    if (sizes.length === 0) {
      toast.warn("⚠️ Please select at least one size");
      return;
    }

    sizes.forEach((s) => {
      addToCart(productData._id, s); // ✅ multiple sizes
    });

    toast.success("🛒 Product added to cart");
    setSizes([]); // Reset selection after add
  };

  if (!productData) return <div className='opacity-0'></div>;

  return (
    <div className='border-t-2 pt-10'>
      <div className='flex gap-1 sm:flex-row'>
        {/* Image Section */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.70%] w-full'>
            {productData.images?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 cursor-pointer'
              />
            ))}
          </div>

          <div className='w-full sm:w-[80%]'>
            {image ? (
              <img className='w-full h-auto' src={image} alt="Product" />
            ) : (
              <div className='w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400'>
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 ml-10'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            {[1, 2, 3, 4].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
            <p className='pl-2'>(120)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Sizes</p>
            <div className='flex gap-2 flex-wrap'>
              {(productData.sizes || []).map((item, index) => (
                <button
                  onClick={() => toggleSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${
                    sizes.includes(item) ? 'border-orange-500 font-semibold' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-600 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-4 text-sm'>Description</b>
          <p className='border px-5 py-4 text-sm'>Reviews (120)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform...</p>
        </div>
      </div>

      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
