import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalPrice: Number,
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', orderSchema);
