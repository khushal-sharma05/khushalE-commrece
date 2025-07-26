import Review from '../models/Review.js';

export const getDashboardData = async (req, res) => {
  try {
    const chartData = [
      { name: 'Jan', revenue: 10000 },
      { name: 'Feb', revenue: 15000 },
      { name: 'Mar', revenue: 12000 },
      { name: 'Apr', revenue: 18000 },
      { name: 'May', revenue: 22000 },
    ];

    const reviews = await Review.find().sort({ createdAt: -1 }).limit(5);

    res.json({ chartData, reviews });
  } catch (err) {
    res.status(500).json({ error: 'Dashboard data fetch failed' });
  }
};

// ✅ Add this function also:
export const addReview = async (req, res) => {
     console.log("Request Body:", req.body);
  try {
    const { name, review } = req.body;
    const newReview = new Review({ name, review, date: new Date().toISOString() });
    await newReview.save();
    res.status(201).json({ success: true, message: "Review added successfully" });
  } catch (err) {
     console.error("Error while adding review:", err);
    res.status(500).json({ error: "Failed to add review" });
  }
};
