
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  date: String,
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
