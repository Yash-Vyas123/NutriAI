const mongoose = require('mongoose');

const healthProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    height: { type: Number, required: true }, // in cm
    weight: { type: Number, required: true }, // in kg
    activityLevel: {
      type: String,
      enum: ['sedentary', 'moderate', 'active'],
      required: true,
    },
    fitnessGoal: {
      type: String,
      enum: ['weight_loss', 'weight_gain', 'maintain'],
      required: true,
    },
    foodPreference: {
      type: String,
      enum: ['vegetarian', 'non-vegetarian', 'vegan'],
      required: true,
    },
    healthConditions: { type: String, default: 'None' },
    // Auto-calculated fields
    bmi: { type: Number },
    dailyCalories: { type: Number },
    macros: {
      protein: { type: Number }, // grams
      carbs: { type: Number },   // grams
      fats: { type: Number },    // grams
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthProfile', healthProfileSchema);
