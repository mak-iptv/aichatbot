import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userMessage);
    const reply = result.response.text();
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gabim gjatë komunikimit me API-në" });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("✅ Serveri po punon në portin " + (process.env.PORT || 3000))
);
