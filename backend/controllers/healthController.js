const HealthProfile = require('../models/HealthProfile');

// ─── Calculation Helpers ──────────────────────────────────────────────────────

// BMI = weight(kg) / height(m)²
const calculateBMI = (weight, height) => {
  const h = height / 100;
  return parseFloat((weight / (h * h)).toFixed(1));
};

// BMR using Mifflin-St Jeor equation
const calculateBMR = (weight, height, age, gender) => {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
};

// TDEE = BMR × activity multiplier
const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = { sedentary: 1.2, moderate: 1.55, active: 1.725 };
  return Math.round(bmr * (multipliers[activityLevel] || 1.2));
};

// Adjust calories based on fitness goal
const adjustCalories = (tdee, goal) => {
  if (goal === 'weight_loss') return Math.round(tdee * 0.80); // 20% deficit
  if (goal === 'weight_gain') return Math.round(tdee * 1.15); // 15% surplus
  return tdee; // maintain
};

// Macronutrient split based on goal
const calculateMacros = (calories, goal) => {
  let pPct, cPct, fPct;
  if (goal === 'weight_loss')      { pPct = 0.40; cPct = 0.30; fPct = 0.30; }
  else if (goal === 'weight_gain') { pPct = 0.30; cPct = 0.50; fPct = 0.20; }
  else                              { pPct = 0.30; cPct = 0.40; fPct = 0.30; }

  return {
    protein: Math.round((calories * pPct) / 4),  // 4 kcal per gram
    carbs:   Math.round((calories * cPct) / 4),
    fats:    Math.round((calories * fPct) / 9),   // 9 kcal per gram
  };
};

// BMI category label
const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25.0) return 'Normal';
  if (bmi < 30.0) return 'Overweight';
  return 'Obese';
};

// ─── Save / Update Health Profile ────────────────────────────────────────────
// POST /api/health/profile  (protected)
const saveHealthProfile = async (req, res) => {
  try {
    const { age, gender, height, weight, activityLevel, fitnessGoal, foodPreference, healthConditions } = req.body;

    if (!age || !gender || !height || !weight || !activityLevel || !fitnessGoal || !foodPreference) {
      return res.status(400).json({ message: 'All health fields are required' });
    }

    const bmi = calculateBMI(weight, height);
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activityLevel);
    const dailyCalories = adjustCalories(tdee, fitnessGoal);
    const macros = calculateMacros(dailyCalories, fitnessGoal);

    const profile = await HealthProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        age, gender, height, weight,
        activityLevel, fitnessGoal, foodPreference,
        healthConditions: healthConditions || 'None',
        bmi, dailyCalories, macros,
      },
      { upsert: true, new: true }
    );

    res.json({ ...profile.toObject(), bmiCategory: getBMICategory(bmi) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Get Health Profile ───────────────────────────────────────────────────────
// GET /api/health/profile  (protected)
const getHealthProfile = async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Health profile not found. Please complete your profile.' });
    }
    res.json({ ...profile.toObject(), bmiCategory: getBMICategory(profile.bmi) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { saveHealthProfile, getHealthProfile };
