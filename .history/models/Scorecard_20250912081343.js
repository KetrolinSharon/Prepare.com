const mongoose = require("mongoose");

const ScorecardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to user
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
