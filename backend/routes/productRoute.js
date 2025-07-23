import express from 'express';
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct
} from '../controllers/productControllers.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();


productRouter.post('/add', upload.any(), addProduct);
productRouter.delete('/delete/:id', removeProduct)
productRouter.get('/list', listProducts);
productRouter.get('/single/:id', singleProduct);

export default productRouter;
