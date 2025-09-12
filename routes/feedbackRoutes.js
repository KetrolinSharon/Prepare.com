const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();

// Add feedback
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.json({ success: false, message: "Feedback cannot be empty" });

    const feedback = new Feedback({ text });
    await feedback.save();

    res.json({ success: true, message: "Thank you for your feedback!" });
  } catch (err) {
    console.error("❌ Feedback Error:", err);
    res.json({ success: false, message: "Error saving feedback" });
  }
});

// Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    console.error("❌ Fetch Feedback Error:", err);
    res.json({ success: false, message: "Error fetching feedbacks" });
  }
});

module.exports = router;
