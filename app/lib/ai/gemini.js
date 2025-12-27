import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiResponse(issues) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an SEO expert.
Explain these problems in simple Hinglish and give improvement tips:

${issues.join(", ")}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
