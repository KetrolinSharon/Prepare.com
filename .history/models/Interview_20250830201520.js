const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questionsAsked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  answers: [String],
  startedAt: Date,
  endedAt: Date
});

module.exports = mongoose.model("Interview", InterviewSchema);
