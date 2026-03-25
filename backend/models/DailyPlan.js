const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  description: String,
  items: [String],
  protein: Number,
  carbs: Number,
  fats: Number
}, { _id: false });

const DailyPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  totalCalories: Number,
  totalProtein: Number,
  totalCarbs: Number,
  totalFats: Number,
  breakfast: MealSchema,
  lunch: MealSchema,
  dinner: MealSchema,
  morningSnack: MealSchema,
  eveningSnack: MealSchema
}, { timestamps: true });

DailyPlanSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyPlan', DailyPlanSchema);
