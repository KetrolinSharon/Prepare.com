const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amirthaavarsinibj_db_user:QWERTY%40av5%21@interviewcluster.vnvwhrq.mongodb.net/interviewApp?retryWrites=true&w=majority&appName=InterviewCluster"
    );
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
