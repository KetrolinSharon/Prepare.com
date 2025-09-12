const mongoose = require("mongoose");

const ScorecardSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // link to user if needed
  score: {
    obtained: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  tips: {
    lag: String,
    impress: String,
    general: String,
    detail: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Scorecard", ScorecardSchema);
