const express = require("express");
const Interview = require("../models/Interview");
const router = express.Router();

// Start Interview
router.post("/start", async (req, res) => {
  try {
    const interview = new Interview({
      userId: req.body.userId,
      questionsAsked: req.body.questions,
      startedAt: new Date()
    });
    await interview.save();
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// End Interview
router.post("/end/:id", async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { endedAt: new Date(), answers: req.body.answers },
      { new: true }
    );
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
