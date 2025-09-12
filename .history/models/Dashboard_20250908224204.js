const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalInterviews: { type: Number, default: 0 },
  avgScore: { type: Number, default: 0 },
  lastInterview: Date
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
