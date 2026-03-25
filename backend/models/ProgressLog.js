const mongoose = require('mongoose');

const progressLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    weight: { type: Number }, // kg
    caloriesConsumed: { type: Number }, // kcal
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProgressLog', progressLogSchema);
