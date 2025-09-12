// routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// CREATE - Add a new question
router.post("/", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE - Get a single question by ID
// ✅ RANDOM must be defined before /:id
router.get("/random", async (req, res) => {
  try {
    const count = await Question.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "No questions available" });
    }

    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);

    res.json({ text: question.text });
  } catch (err) {
    console.error("Error in /random:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ⚠️ keep this AFTER
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE - Update a question by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuestion) return res.status(404).json({ message: "Not found" });
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Remove a question by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
