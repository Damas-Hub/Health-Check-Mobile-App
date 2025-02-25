import { NextApiRequest, NextApiResponse } from "next";

const questions = {
    flirty: [
      "What's the cutest thing you've ever done for someone?",
      "If we were stuck on an island, what’s one thing you'd bring?",
      "What's your idea of a perfect date?",
      "What’s something about me that turns you on?",
      "If I dared you to kiss me right now, would you?",
      "What’s one thing you’ve always wanted to do with someone you like?",
      "Do you like being teased, or do you prefer to tease?",
      "What’s your favorite way to be flirted with?",
      "What’s the most spontaneous thing you’ve done in a relationship?",
    ],
    emotional: [
      "What’s one childhood memory that shaped who you are today?",
      "If you could relive one day of your life, which would it be?",
      "What’s something you’ve always wanted to say but never had the chance?",
      "Have you ever had your heart broken? How did you heal?",
      "What’s your biggest fear when it comes to love?",
      "Do you believe in soulmates? Why or why not?",
      "What’s something you wish people understood about you?",
      "What does true intimacy mean to you?",
      "What’s the one thing you need most in a relationship?",
      "If you ever realize I’m not the person you thought I was, how would you handle it?",
      "What would you do if you discovered our values or life goals are too different to make this work?",
      "If you felt I was no longer fulfilling your emotional needs, how would you address it?",
      "How would you react if you found out I made a mistake that hurt you deeply, even unintentionally?",
      "If you felt you were giving more to the relationship than I am, what steps would you take?",
      "If you realized I couldn't meet your expectations down the line, would you talk to me about it or quietly pull away?",
      "How would you handle it if you started questioning whether we're truly right for each other after some time together?",
      "If you found out I was keeping something important from you, how would that change your perception of us?",
      "If you discovered flaws in me that were hard to accept, would you try to work through them or move on?",
      "If you felt uncertain about us in the future, would you confront it or wait until it became a bigger issue?",
    ],
    fun: [
      "If you could have dinner with any celebrity, who would it be?",
      "What’s the weirdest food you’ve ever tried?",
      "If you had a superpower, what would it be and why?",
      "Would you rather travel to the past or the future?",
      "What’s your guilty pleasure TV show or song?",
      "If you could swap lives with anyone for a day, who would it be?",
      "What's the most embarrassing thing you've ever done in public?",
      "If you had to survive a zombie apocalypse with one person, who would it be?",
      "What's the craziest dare you've ever done?",
    ],
    spicy: [
      "What’s your biggest turn-on?",
      "Would you rather have a night full of passion or a deep emotional connection?",
      "What’s the most adventurous thing you’ve done in bed?",
      "Do you prefer to take control or be controlled?",
      "If I whispered something naughty in your ear right now, what would you want me to say?",
      "What’s a fantasy you’ve always wanted to try but haven’t yet?",
      "If I blindfolded you and kissed you slowly, how would you react?",
      "Do you like it slow and sensual or rough and wild?",
      "What’s one thing you’d love for me to do to you but are too shy to say?",
      "What’s the most daring place you’ve ever done something spicy?",
      "If we had only 5 minutes alone together, what would you want to do?",
      "Do you like to be surprised in the bedroom, or do you like to plan things out?",
      "What's the most seductive outfit you think I could wear for you?",
      "Would you rather have an intense night in or a teasing build-up throughout the day?",
      "What’s one word that instantly gets you in the mood?",
      "What’s something small that turns you on instantly?",
      "How do you feel about being woken up in a spicy way?",
    ],
  };

  let usedQuestions: Record<string, Set<string>> = {
    flirty: new Set(),
    emotional: new Set(),
    fun: new Set(),
    spicy: new Set(),
  };
  
  type Category = 'flirty' | 'emotional' | 'fun' | 'spicy';

  export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const category = (req.query.category as Category) || "spicy";
    const categoryQuestions = questions[category] || questions.spicy;
  
    // Filter out already used questions
    const availableQuestions = categoryQuestions.filter(
      (q) => !usedQuestions[category].has(q)
    );
  
    // Reset if all questions have been used
    if (availableQuestions.length === 0) {
      usedQuestions[category] = new Set();
    }
  
    // Get a random question
    const randomQuestion =
      availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  
    // Store used question
    usedQuestions[category].add(randomQuestion);
  
    res.status(200).json({ question: randomQuestion });
  }
  