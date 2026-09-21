const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Text-to-Speech API is running",
  });
});

// Available languages and voices
app.get("/api/voices", (req, res) => {
  const voices = [
    {
      id: "en-US",
      name: "English (US)",
      language: "English",
      gender: "Female",
    },
    {
      id: "en-GB",
      name: "English (UK)",
      language: "English",
      gender: "Female",
    },
    {
      id: "hi-IN",
      name: "Hindi (India)",
      language: "Hindi",
      gender: "Female",
    },
    {
      id: "es-ES",
      name: "Spanish",
      language: "Spanish",
      gender: "Female",
    },
    {
      id: "fr-FR",
      name: "French",
      language: "French",
      gender: "Female",
    },
    {
      id: "de-DE",
      name: "German",
      language: "German",
      gender: "Female",
    },
  ];

  res.json({
    success: true,
    voices,
  });
});

// Generate speech request
app.post("/api/tts", (req, res) => {
  const { text, language, voice } = req.body;

  // Validate text
  if (!text || !text.trim()) {
    return res.status(400).json({
      success: false,
      message: "Text cannot be empty.",
    });
  }

  // Maximum 5000 characters
  if (text.length > 5000) {
    return res.status(400).json({
      success: false,
      message: "Text cannot exceed 5000 characters.",
    });
  }

  if (!language) {
    return res.status(400).json({
      success: false,
      message: "Language is required.",
    });
  }

  if (!voice) {
    return res.status(400).json({
      success: false,
      message: "Voice is required.",
    });
  }

  // The actual speech is handled by the browser Web Speech API.
  res.json({
    success: true,
    message: "Speech request validated successfully.",
    data: {
      text,
      language,
      voice,
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});