const FoodItem = require('../models/FoodItem');

// ─── Search Foods ─────────────────────────────────────────────────────────────
// GET /api/food/search?q=query  (protected)
const searchFoods = async (req, res) => {
  try {
    const { q } = req.query;
    const query = q 
      ? { $or: [
          { name: { $regex: q, $options: 'i' } },
          { category: { $regex: q, $options: 'i' } }
        ]} 
      : {};
    const foods = await FoodItem.find(query).limit(100); // Increased limit for better results
    res.json(foods);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Get All Foods ────────────────────────────────────────────────────────────
// GET /api/food/all  (protected)
const getAllFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find({}).sort({ category: 1, name: 1 });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { searchFoods, getAllFoods };
