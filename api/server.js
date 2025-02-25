const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const questions = {
  flirty: [
    "What's the cutest thing you've ever done for someone?",
    "If we were stuck on an island, what’s one thing you'd bring?",
    "What's your idea of a perfect date?"
  ],
  emotional: [
    "What’s one childhood memory that shaped who you are today?",
    "If you could relive one day of your life, which would it be?",
    "What’s something you’ve always wanted to say but never had the chance?"
  ],
  fun: [
    "If you could have dinner with any celebrity, who would it be?",
    "What’s the weirdest food you’ve ever tried?",
    "If you had a superpower, what would it be and why?"
  ]
};

app.get("/question", (req, res) => {
  const category = req.query.category || "fun";
  const categoryQuestions = questions[category] || questions.fun;
  const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
  res.json({ question: randomQuestion });
});

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to the Chat Questions API! Use /question to get a random question.");
  });
  
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
