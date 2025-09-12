require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/interviews", require("./routes/interviewRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/scorecard", require("./routes/scorecardRoutes"));

// Root
app.get("/", (req, res) => {
  res.send("🚀 Interview App API running. Use /api/* endpoints");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
