const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const FoodItem = require('../models/FoodItem');

const foods = [
  // ─── Proteins (Non-Veg) ───────────────────────────────────────────────────
  { name: 'Chicken Breast', category: 'Proteins', calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, isVegetarian: false, isVegan: false },
  { name: 'Egg Whole', category: 'Proteins', calories: 155, protein: 13, carbs: 1.1, fats: 11, fiber: 0, isVegetarian: true, isVegan: false },
  { name: 'Egg White', category: 'Proteins', calories: 52, protein: 11, carbs: 0.7, fats: 0.2, fiber: 0, isVegetarian: true, isVegan: false },
  { name: 'Tuna (Canned)', category: 'Proteins', calories: 116, protein: 26, carbs: 0, fats: 1, fiber: 0, isVegetarian: false, isVegan: false },
  { name: 'Salmon', category: 'Proteins', calories: 208, protein: 20, carbs: 0, fats: 13, fiber: 0, isVegetarian: false, isVegan: false },
  { name: 'Shrimp', category: 'Proteins', calories: 99, protein: 24, carbs: 0.2, fats: 0.3, fiber: 0, isVegetarian: false, isVegan: false },

  // ─── Proteins (Vegetarian/Vegan) ──────────────────────────────────────────
  { name: 'Tofu', category: 'Proteins', calories: 76, protein: 8, carbs: 1.9, fats: 4.8, fiber: 0.3, isVegetarian: true, isVegan: true },
  { name: 'Tempeh', category: 'Proteins', calories: 193, protein: 19, carbs: 9.4, fats: 11, fiber: 1.8, isVegetarian: true, isVegan: true },
  { name: 'Paneer', category: 'Proteins', calories: 265, protein: 18, carbs: 1.2, fats: 20, fiber: 0, isVegetarian: true, isVegan: false },
  { name: 'Chickpeas', category: 'Proteins', calories: 164, protein: 9, carbs: 27, fats: 2.6, fiber: 7.6, isVegetarian: true, isVegan: true },
  { name: 'Lentils (Dal)', category: 'Proteins', calories: 116, protein: 9, carbs: 20, fats: 0.4, fiber: 7.9, isVegetarian: true, isVegan: true },
  { name: 'Black Beans', category: 'Proteins', calories: 132, protein: 8.9, carbs: 24, fats: 0.5, fiber: 8.7, isVegetarian: true, isVegan: true },
  { name: 'Kidney Beans', category: 'Proteins', calories: 127, protein: 8.7, carbs: 22.8, fats: 0.5, fiber: 6.4, isVegetarian: true, isVegan: true },
  { name: 'Edamame', category: 'Proteins', calories: 121, protein: 11, carbs: 9, fats: 5.2, fiber: 5.2, isVegetarian: true, isVegan: true },

  // ─── Grains & Carbs ───────────────────────────────────────────────────────
  { name: 'Brown Rice', category: 'Grains', calories: 111, protein: 2.6, carbs: 23, fats: 0.9, fiber: 1.8, isVegetarian: true, isVegan: true },
  { name: 'White Rice', category: 'Grains', calories: 130, protein: 2.7, carbs: 28, fats: 0.3, fiber: 0.4, isVegetarian: true, isVegan: true },
  { name: 'Oats', category: 'Grains', calories: 389, protein: 17, carbs: 66, fats: 7, fiber: 10.6, isVegetarian: true, isVegan: true },
  { name: 'Whole Wheat Bread', category: 'Grains', calories: 247, protein: 13, carbs: 41, fats: 4.2, fiber: 7, isVegetarian: true, isVegan: true },
  { name: 'Quinoa', category: 'Grains', calories: 120, protein: 4.4, carbs: 22, fats: 1.9, fiber: 2.8, isVegetarian: true, isVegan: true },
  { name: 'Sweet Potato', category: 'Grains', calories: 86, protein: 1.6, carbs: 20, fats: 0.1, fiber: 3, isVegetarian: true, isVegan: true },
  { name: 'Whole Wheat Pasta', category: 'Grains', calories: 124, protein: 5.3, carbs: 26, fats: 1.1, fiber: 3.2, isVegetarian: true, isVegan: true },
  { name: 'Multigrain Roti', category: 'Grains', calories: 259, protein: 9.5, carbs: 49, fats: 3.9, fiber: 6.2, isVegetarian: true, isVegan: true },

  // ─── Vegetables ───────────────────────────────────────────────────────────
  { name: 'Broccoli', category: 'Vegetables', calories: 34, protein: 2.8, carbs: 7, fats: 0.4, fiber: 2.6, isVegetarian: true, isVegan: true },
  { name: 'Spinach', category: 'Vegetables', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, fiber: 2.2, isVegetarian: true, isVegan: true },
  { name: 'Kale', category: 'Vegetables', calories: 49, protein: 4.3, carbs: 9, fats: 0.9, fiber: 3.6, isVegetarian: true, isVegan: true },
  { name: 'Carrot', category: 'Vegetables', calories: 41, protein: 0.9, carbs: 10, fats: 0.2, fiber: 2.8, isVegetarian: true, isVegan: true },
  { name: 'Bell Pepper', category: 'Vegetables', calories: 31, protein: 1, carbs: 6, fats: 0.3, fiber: 2.1, isVegetarian: true, isVegan: true },
  { name: 'Tomato', category: 'Vegetables', calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, fiber: 1.2, isVegetarian: true, isVegan: true },
  { name: 'Cucumber', category: 'Vegetables', calories: 16, protein: 0.7, carbs: 3.6, fats: 0.1, fiber: 0.5, isVegetarian: true, isVegan: true },
  { name: 'Mushroom', category: 'Vegetables', calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3, fiber: 1, isVegetarian: true, isVegan: true },
  { name: 'Cauliflower', category: 'Vegetables', calories: 25, protein: 1.9, carbs: 5, fats: 0.3, fiber: 2, isVegetarian: true, isVegan: true },

  // ─── Fruits ───────────────────────────────────────────────────────────────
  { name: 'Banana', category: 'Fruits', calories: 89, protein: 1.1, carbs: 23, fats: 0.3, fiber: 2.6, isVegetarian: true, isVegan: true },
  { name: 'Apple', category: 'Fruits', calories: 52, protein: 0.3, carbs: 14, fats: 0.2, fiber: 2.4, isVegetarian: true, isVegan: true },
  { name: 'Orange', category: 'Fruits', calories: 47, protein: 0.9, carbs: 12, fats: 0.1, fiber: 2.4, isVegetarian: true, isVegan: true },
  { name: 'Mango', category: 'Fruits', calories: 60, protein: 0.8, carbs: 15, fats: 0.4, fiber: 1.6, isVegetarian: true, isVegan: true },
  { name: 'Berries (Mixed)', category: 'Fruits', calories: 57, protein: 0.7, carbs: 14, fats: 0.3, fiber: 2.4, isVegetarian: true, isVegan: true },
  { name: 'Grapes', category: 'Fruits', calories: 69, protein: 0.7, carbs: 18, fats: 0.2, fiber: 0.9, isVegetarian: true, isVegan: true },
  { name: 'Papaya', category: 'Fruits', calories: 43, protein: 0.5, carbs: 11, fats: 0.3, fiber: 1.7, isVegetarian: true, isVegan: true },
  { name: 'Watermelon', category: 'Fruits', calories: 30, protein: 0.6, carbs: 7.6, fats: 0.2, fiber: 0.4, isVegetarian: true, isVegan: true },

  // ─── Dairy & Alternatives ─────────────────────────────────────────────────
  { name: 'Greek Yogurt', category: 'Dairy', calories: 59, protein: 10, carbs: 3.6, fats: 0.4, fiber: 0, isVegetarian: true, isVegan: false },
  { name: 'Milk (Whole)', category: 'Dairy', calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, fiber: 0, isVegetarian: true, isVegan: false },
  { name: 'Cheddar Cheese', category: 'Dairy', calories: 402, protein: 25, carbs: 1.3, fats: 33, fiber: 0, isVegetarian: true, isVegan: false },
  { name: 'Almond Milk', category: 'Dairy', calories: 17, protein: 0.6, carbs: 1.3, fats: 1.1, fiber: 0.3, isVegetarian: true, isVegan: true },
  { name: 'Soy Milk', category: 'Dairy', calories: 33, protein: 3.3, carbs: 1.8, fats: 1.8, fiber: 0.6, isVegetarian: true, isVegan: true },
  { name: 'Cottage Cheese', category: 'Dairy', calories: 98, protein: 11, carbs: 3.4, fats: 4.3, fiber: 0, isVegetarian: true, isVegan: false },

  // ─── Healthy Fats ─────────────────────────────────────────────────────────
  { name: 'Avocado', category: 'Fats', calories: 160, protein: 2, carbs: 9, fats: 15, fiber: 6.7, isVegetarian: true, isVegan: true },
  { name: 'Almonds', category: 'Fats', calories: 579, protein: 21, carbs: 22, fats: 50, fiber: 12.5, isVegetarian: true, isVegan: true },
  { name: 'Walnuts', category: 'Fats', calories: 654, protein: 15, carbs: 14, fats: 65, fiber: 6.7, isVegetarian: true, isVegan: true },
  { name: 'Peanut Butter', category: 'Fats', calories: 588, protein: 25, carbs: 20, fats: 50, fiber: 6, isVegetarian: true, isVegan: true },
  { name: 'Olive Oil', category: 'Fats', calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, isVegetarian: true, isVegan: true },
  { name: 'Chia Seeds', category: 'Fats', calories: 486, protein: 17, carbs: 42, fats: 31, fiber: 34, isVegetarian: true, isVegan: true },
  { name: 'Flax Seeds', category: 'Fats', calories: 534, protein: 18, carbs: 29, fats: 42, fiber: 27, isVegetarian: true, isVegan: true },

  // ─── Indian Dishes ────────────────────────────────────────────────────────
  { name: 'Dal Tadka', category: 'Indian', calories: 102, protein: 6, carbs: 14, fats: 2.5, fiber: 3.8, isVegetarian: true, isVegan: true },
  { name: 'Rajma Curry', category: 'Indian', calories: 128, protein: 7, carbs: 20, fats: 2.5, fiber: 5.2, isVegetarian: true, isVegan: true },
  { name: 'Palak Paneer', category: 'Indian', calories: 183, protein: 10, carbs: 7, fats: 13, fiber: 2.5, isVegetarian: true, isVegan: false },
  { name: 'Chole Masala', category: 'Indian', calories: 164, protein: 8.5, carbs: 22, fats: 4.5, fiber: 7, isVegetarian: true, isVegan: true },
  { name: 'Sambar', category: 'Indian', calories: 52, protein: 2.8, carbs: 8, fats: 1.2, fiber: 2.2, isVegetarian: true, isVegan: true },
  { name: 'Idli (2 pcs)', category: 'Indian', calories: 116, protein: 4, carbs: 24, fats: 0.6, fiber: 1, isVegetarian: true, isVegan: true },
  { name: 'Upma', category: 'Indian', calories: 112, protein: 3.5, carbs: 20, fats: 2.8, fiber: 1.5, isVegetarian: true, isVegan: true },
  { name: 'Poha', category: 'Indian', calories: 130, protein: 2.5, carbs: 25, fats: 2, fiber: 1, isVegetarian: true, isVegan: true },
  { name: 'Dhokla (2 pcs)', category: 'Indian', calories: 160, protein: 6, carbs: 22, fats: 5, fiber: 1, isVegetarian: true, isVegan: true },
  { name: 'Pav Bhaji (1 plate)', category: 'Indian', calories: 400, protein: 9, carbs: 55, fats: 18, fiber: 6, isVegetarian: true, isVegan: false },
  { name: 'Paneer Paratha (1 pc)', category: 'Indian', calories: 250, protein: 12, carbs: 35, fats: 8, fiber: 3, isVegetarian: true, isVegan: false },
  { name: 'Aloo Paratha (1 pc)', category: 'Indian', calories: 210, protein: 4, carbs: 38, fats: 5, fiber: 3, isVegetarian: true, isVegan: true },
  { name: 'Chicken Tikka', category: 'Indian', calories: 150, protein: 22, carbs: 2, fats: 6, fiber: 0, isVegetarian: false, isVegan: false },
  { name: 'Chicken Biryani (1 cup)', category: 'Indian', calories: 290, protein: 18, carbs: 45, fats: 9, fiber: 2, isVegetarian: false, isVegan: false },
  { name: 'Veg Biryani (1 cup)', category: 'Indian', calories: 240, protein: 6, carbs: 48, fats: 5, fiber: 4, isVegetarian: true, isVegan: true },
  { name: 'Butter Chicken', category: 'Indian', calories: 220, protein: 18, carbs: 8, fats: 14, fiber: 1, isVegetarian: false, isVegan: false },
  { name: 'Bhindi Masala', category: 'Indian', calories: 95, protein: 2, carbs: 12, fats: 4, fiber: 3, isVegetarian: true, isVegan: true },
  { name: 'Dosa (1 plain)', category: 'Indian', calories: 133, protein: 3, carbs: 26, fats: 2, fiber: 1, isVegetarian: true, isVegan: true },
  { name: 'Masala Dosa (1 pc)', category: 'Indian', calories: 210, protein: 4, carbs: 35, fats: 6, fiber: 2, isVegetarian: true, isVegan: true },
  { name: 'Fish Curry', category: 'Indian', calories: 145, protein: 19, carbs: 4, fats: 6, fiber: 1, isVegetarian: false, isVegan: false },
  { name: 'Curd Rice', category: 'Indian', calories: 110, protein: 3, carbs: 18, fats: 2.5, fiber: 0.5, isVegetarian: true, isVegan: false },
  { name: 'Gulab Jamun (1 pc)', category: 'Indian', calories: 150, protein: 2, carbs: 25, fats: 5, fiber: 0.1, isVegetarian: true, isVegan: false },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await FoodItem.deleteMany({});
    await FoodItem.insertMany(foods);
    console.log(`✅ Seeded ${foods.length} food items successfully`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    process.exit();
  }
};

seed();
