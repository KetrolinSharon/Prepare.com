const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Question = require('../models/Question');
const Interview = require('../models/Interview');

router.get('/', async (req, res) => {
  try {
    const [totalUsers, totalQuestions, totalInterviews] = await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      Interview.countDocuments()
    ]);

    res.json({
      totalUsers,
      totalQuestions,
      totalInterviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
