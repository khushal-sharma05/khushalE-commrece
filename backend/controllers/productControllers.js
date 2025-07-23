import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModels.js';

// ✅ Add Product Controller
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    } = req.body;

    console.log("📦 Files received:", req.files);

    // ✅ Filter only image files
    const images = req.files?.filter(file =>
      file.fieldname.startsWith('image') && file.mimetype.startsWith('image/')
    );

    // ✅ Upload all images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image'
        });
        console.log("☁️ Cloudinary Upload:", result.secure_url);
        return result.secure_url;
      })
    );

    // ✅ Parse sizes from string to array if needed
    let parsedSizes = [];
    try {
      parsedSizes = typeof sizes === 'string'
        ? JSON.parse(sizes.replace(/'/g, '"'))
        : sizes;
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid sizes format" });
    }


    const productData = {
      name,
      description,
      category,
      subcategory: subCategory,
      price: Number(price),
      bestseller: bestseller === 'true',
      sizes: parsedSizes,        
      images: imagesUrl,
      date: Date.now()
    };

    console.log(" Final Product Data:", productData);

   
    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added successfully" });

  } catch (error) {
    console.error(" Add Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



// ✅ List All Products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ date: -1 }); // latest first
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("❌ List Products Error:", error.message);
    res.status(500).json({ success: false, message: "Unable to fetch products" });
  }
};



// ✅ Delete Product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Remove Product Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};




const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(" Single Product Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
