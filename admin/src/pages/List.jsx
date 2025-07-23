import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currency } from '../App';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/list`);
      console.log(" Full response:", response.data);
      console.log(" Products array:", response.data.data);
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
    <div className="p-4 md:px-8 w-full max-w-[1000px] mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">All Products List</h2>

      {/* Desktop Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-[#f6f6f6] text-gray-700 font-semibold text-[15px] border border-gray-200 shadow-sm rounded-md mb-4">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      {/* Product Rows */}
      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 items-center px-4 py-3 border border-gray-200 text-[14px] text-gray-800 bg-white rounded-md shadow-sm mb-3"
        >
          <img
            src={item.images?.[0] || 'https://via.placeholder.com/100'}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md border"
          />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <button
            onClick={() => handleDelete(item._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
