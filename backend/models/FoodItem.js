const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: 'General' },
    calories: { type: Number, required: true },  // per 100g
    protein: { type: Number, required: true },   // grams per 100g
    carbs: { type: Number, required: true },     // grams per 100g
    fats: { type: Number, required: true },      // grams per 100g
    fiber: { type: Number, default: 0 },
    isVegetarian: { type: Boolean, default: true },
    isVegan: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoodItem', foodItemSchema);
