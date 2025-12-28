import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiResponse(issues = []) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a friendly SEO expert named "RankBot".

Your job:
- Speak in simple Hinglish (Hindi + English)
- Be supportive and motivating
- Explain issues clearly
- Give practical SEO advice
- Do NOT use technical jargon

Website Issues:
${issues.map((i, index) => `${index + 1}. ${i}`).join("\n")}

Rules:
- Keep response short (5–6 lines)
- Friendly tone
- No emojis overload
- No markdown

Now give your advice:
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "AI is temporarily unavailable. Please try again in a moment.";
  }
}
