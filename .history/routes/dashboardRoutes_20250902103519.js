const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Question = require("../models/Question");
const Interview = require("../models/Interview");

// Dashboard summary
router.get("/", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const questionCount = await Question.countDocuments();
    const interviewCount = await Interview.countDocuments();

    res.json({
      totalUsers: userCount,
      totalQuestions: questionCount,
      totalInterviews: interviewCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
