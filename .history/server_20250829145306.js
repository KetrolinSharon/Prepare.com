const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://amirthaavarsinibj_db_user:QWERTY%40av5%21@interviewcluster.vnvwhrq.mongodb.net/?retryWrites=true&w=majority&appName=InterviewCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" Connected to MongoDB Atlas"))
.catch(err => console.error(" MongoDB Connection Error:", err));

const QuestionSchema = new mongoose.Schema({
  text: String,
  category: String,
  difficulty: String,
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model("Question", QuestionSchema);

app.get('/api/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
