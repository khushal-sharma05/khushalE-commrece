import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
