import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currency } from '../App';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/list`);
      setList(response.data.data || []);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/delete/${id}`);
      setList(prevList => prevList.filter(item => item._id !== id));
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 md:px-8 w-full max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">📦 All Products List</h2>

      {/* Desktop Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-3 px-4 bg-gray-100 text-gray-700 font-semibold text-[15px] border border-gray-300 shadow-sm rounded-md mb-4">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Actions</span>
      </div>

      {/* Product Rows */}
      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_2fr] gap-4 items-center px-4 py-3 border border-gray-200 text-[14px] text-gray-800 bg-white rounded-lg shadow-sm mb-3 hover:shadow-md transition-shadow duration-200"
        >
          <img
            src={item.images?.[0] || 'https://via.placeholder.com/100'}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md border"
          />
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-600">{item.category}</p>
          <p className="font-semibold text-green-600">{currency}{item.price}</p>

          <div className="flex gap-3 justify-start md:justify-center flex-wrap">
            <button
              onClick={() => navigate(`/product/view/${item._id}`)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              View
            </button>
            <button
              onClick={() => navigate(`/product/edit/${item._id}`)}
              className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
