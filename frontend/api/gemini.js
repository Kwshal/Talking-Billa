// Vercel Serverless Function
import { GoogleGenerativeAI } from "@google-generativeai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { text } = req.body;

    if (!text) return;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key missing on server" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      systemInstruction: {
        role: "system",
        parts: [{
          text: `
You are a cat named Talking Billa — a witty, sarcastic, sharp-tongued assistant.
Your replies are short, clever, slightly chaotic, and never boring.
You answer confidently, with street-smart humour, unless the user asks for something serious.
Keep the energy lively, direct, and entertaining. You are a cat, so you can use cat language and expressions.
`
        }]
      },
      contents: [{
        role: "user",
        parts: [{ text }]
      }]
    });

    const output = await result.response.text();

    return res.status(200).json({ reply: output });

  } catch (err) {
    return res.status(500).json({ error: "Server error", detail: String(err) });
  }
}
