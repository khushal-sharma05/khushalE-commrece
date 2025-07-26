import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    price: '',
    sizes: [],
    bestseller: false,
  });

  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...imageFiles];
      const newPreviews = [...imagePreviews];
      newFiles[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      setImageFiles(newFiles);
      setImagePreviews(newPreviews);
    }
  };

  const handleSizeChange = (size) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('subCategory', product.subCategory);
      formData.append('price', product.price);
      formData.append('bestseller', product.bestseller);

      product.sizes.forEach((size) => {
        formData.append('sizes[]', size);
      });

      imageFiles.forEach((img) => {
        if (img) {
          formData.append('images', img);
        }
      });

      const cleanUrl = backendUrl.replace(/\/$/, '');

      const response = await axios.post(`${cleanUrl}/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success("✅ Product added successfully!");
      } else {
        toast.error("❌ Failed to add product!");
      }

      setProduct({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        price: '',
        sizes: [],
        bestseller: false,
      });
      setImageFiles([null, null, null, null]);
      setImagePreviews([null, null, null, null]);

    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">🛒 Add New Product</h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Upload Images</label>
        <div className="flex gap-4 flex-wrap">
          {[0, 1, 2, 3].map((index) => (
            <label key={index} htmlFor={`image${index}`}>
              <img
                className="w-24 h-24 object-cover border rounded cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
                src={imagePreviews[index] || assets.upload_area}
                alt={`Upload ${index + 1}`}
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Product Description"
          className="w-full border p-3 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          required
        ></textarea>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Sub Category"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={product.subCategory}
          onChange={(e) => setProduct({ ...product, subCategory: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
      </div>

      <div className="mb-4">
        <label className="font-medium text-gray-700">Available Sizes:</label>
        <div className="flex gap-4 flex-wrap mt-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <label key={size} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                value={size}
                checked={product.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={product.bestseller}
          onChange={() =>
            setProduct({ ...product, bestseller: !product.bestseller })
          }
        />
        <label className="text-sm">Mark as Bestseller</label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        ➕ Add Product
      </button>
    </form>
  );
};

export default Add;
