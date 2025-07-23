import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [String], // array of image URLs
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  sizes: {
    type: [String], // array of sizes like ['S', 'M', 'L']
    required: true
  },
  bestseller: {
    type: Boolean,
    default: false
  },
  date: {
    type: Number,
    required: true
  }
});

// ✅ Correct export with mongoose model caching in Next.js environments
const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
