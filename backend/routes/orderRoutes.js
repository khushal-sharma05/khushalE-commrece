import express from 'express';
import { getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.get('/all', getAllOrders);

export default router;
