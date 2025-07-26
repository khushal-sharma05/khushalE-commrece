import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { currency, backendUrl } from '../App';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h2>
      <img src={product.images?.[0]} alt={product.name} className="w-full h-64 object-cover rounded" />
      <p className="mt-4 text-gray-700"><strong>Category:</strong> {product.category}</p>
      <p className="text-gray-700"><strong>Price:</strong> {currency}{product.price}</p>
      <p className="text-gray-600 mt-3">{product.description}</p>
    </div>
  );
};

export default ProductView;
