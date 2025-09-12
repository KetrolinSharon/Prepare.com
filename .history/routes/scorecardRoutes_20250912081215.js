const express = require("express");
const router = express.Router();
const Scorecard = require("../models/Scorecard");

// ✅ CREATE scorecard
router.post("/", async (req, res) => {
  try {
    const newScore = new Scorecard(req.body);
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET latest scorecard
router.get("/latest", async (req, res) => {
  try {
    const latest = await Scorecard.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ message: "No scorecard found" });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
