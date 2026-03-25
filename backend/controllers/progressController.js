const ProgressLog = require('../models/ProgressLog');

// ─── Log Progress ─────────────────────────────────────────────────────────────
// POST /api/progress/log  (protected)
const logProgress = async (req, res) => {
  try {
    const { weight, caloriesConsumed, notes, date } = req.body;

    const log = await ProgressLog.create({
      user: req.user.id,
      weight,
      caloriesConsumed,
      notes,
      date: date || Date.now(),
    });

    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── Get Progress History ─────────────────────────────────────────────────────
// GET /api/progress/history  (protected)
const getProgressHistory = async (req, res) => {
  try {
    const logs = await ProgressLog.find({ user: req.user.id })
      .sort({ date: 1 })
      .limit(30);

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { logProgress, getProgressHistory };
