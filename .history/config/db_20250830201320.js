const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("your_mongo_atlas_connection_string");
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
