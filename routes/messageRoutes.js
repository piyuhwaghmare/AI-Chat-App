const router = require('express').Router();
const Message = require('../models/message');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

router.get('/history', async (req, res) => {
  try {
    const history = await Message.find().sort({ timestamp: 1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  try {
   
    await new Message({ role: 'user', content: message }).save();
    console.log("User message saved. Sending to Gemini...");

    const result = await model.generateContent(message);
    const response = await result.response;
    const aiText = response.text();

    console.log("Gemini Responded!");

    await new Message({ role: 'assistant', content: aiText }).save();

    res.json({ reply: aiText });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: 'AI Service Unavailable' });
  }
});

module.exports = router;
