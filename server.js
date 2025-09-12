// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// ==================== MongoDB Connection ====================
mongoose.connect("mongodb://127.0.0.1:27017/prepare", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected to 'prepare' database"))
.catch(err => console.error("❌ MongoDB Error:", err));

// ==================== Schemas ====================
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Mongoose will automatically create a collection called "users"
const User = mongoose.model("User", UserSchema);

const FeedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// This will create a collection called "feedbacks"
const Feedback = mongoose.model("Feedback", FeedbackSchema);

// ==================== Routes ====================

// Root API test
app.get("/", (req, res) => {
  res.send("✅ Welcome to Prepare.com API 🚀");
});

// -------- Signup --------
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ success: true, message: "Signup successful!" });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.json({ success: false, message: "Error during signup" });
  }
});

// -------- Login --------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid password" });

    res.json({ success: true, message: "Login successful", name: user.name, email: user.email });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.json({ success: false, message: "Error during login" });
  }
});

// -------- Dashboard (example: list all users without password) --------
app.get("/home", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide passwords
    res.json({ success: true, users });
  } catch (err) {
    console.error("❌ Dashboard Error:", err);
    res.json({ success: false, message: "Error fetching dashboard data" });
  }
});

// -------- Feedback --------
app.post("/feedback", async (req, res) => {
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

// Get all feedbacks (optional)
app.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    console.error("❌ Fetch Feedback Error:", err);
    res.json({ success: false, message: "Error fetching feedbacks" });
  }
});

// ==================== Server ====================
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
