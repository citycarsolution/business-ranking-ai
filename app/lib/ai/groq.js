import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getGroqResponse(issues = []) {
  try {
    const prompt = `
You are an SEO expert named RankBot.

Explain issues in Hinglish (simple).
Give practical SEO advice.

Website Issues:
${issues.map((i, idx) => `${idx + 1}. ${i}`).join("\n")}
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Groq Error:", err);
    return "AI temporarily unavailable. Please try again.";
  }
}
