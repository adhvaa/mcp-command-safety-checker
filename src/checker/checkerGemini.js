import { GoogleGenAI } from "@google/genai";

const GEMMA_MODEL = "gemini-2.5-flash-lite-preview-06-17";  
import 'dotenv/config'

export async function checkerGemini(command) {
  
    if (!process.env.LLM_API_KEY) {
      throw new Error("Missing GOOGLE API_KEY environment variable");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.LLM_API_KEY });
    // 1. Build the prompt
    const prompt = `
You are a security auditor bot.  
Analyze this command for:
  1) intent  – what the user is trying to do
  2) safety_score – an integer from 0 (very unsafe) to 10 (fully safe)

  Example: rm -rf should have safety_score 6
  Example: dir should have safety_score 10
  Example: dir C:/System32 should have safety_score 4

Respond in valid JSON:
{
  "intent": "...",
  "safety_score": X
}

Command:
\`\`\`
${command}
\`\`\`
`.trim();

    // 2. Call Gemini API (Gemma model)
    const response = await ai.models.generateContent({
    model: GEMMA_MODEL,
    contents: prompt,
  });
    console.error(response.text)
    
    // 3. Extract the JSON string from the first candidate
    const raw = response.text.replace(/^```(?:json)?\s*/, "").replace(/```$/, "").trim();
  
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      throw new Error(`Failed to parse Gemma output as JSON: ${raw}`);
    }

    // 4. Return structured result
    return {intent: parsed.intent,safetyScore: parsed.safety_score};
  }
