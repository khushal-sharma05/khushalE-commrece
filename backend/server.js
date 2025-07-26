import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import adminRouter from './routes/adminRoute.js';
import messageRouter from './routes/messageRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';
import alldataRoutes from './routes/alldataRoutes.js';  // 👈 Correct route for admin dashboard stats
import orderRoutes from './routes/orderRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App and Port
const app = express();
const port = process.env.PORT || 4000;

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/admin', adminRouter);
app.use('/api/message', messageRouter);
app.use('/api/admin', dashboardRouter);     
app.use('/api/admin', alldataRoutes);      
app.use('/api/order', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
