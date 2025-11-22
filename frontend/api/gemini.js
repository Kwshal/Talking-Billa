// Vercel Serverless Function
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    // Reject anything other than POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Load API key securely from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key missing on server" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(text);
    const output = await result.response.text();

    return res.status(200).json({ reply: output });

  } catch (err) {
    return res.status(500).json({ error: "Server error", detail: String(err) });
  }
}
