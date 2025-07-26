
import Review from "../models/Review.js";

// Add review
export const addReview = async (req, res) => {
  try {
    const { name, review, date } = req.body;

    if (!name || !review || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = new Review({ name, review, date });
    await newReview.save();

    res.status(201).json({ success: true, message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
