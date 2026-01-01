import Groq from "groq-sdk";

export async function getGroqResponse(prompt) {
  // ✅ SAFE GUARD (important)
  if (!process.env.GROQ_API_KEY) {
    console.warn("⚠️ GROQ_API_KEY missing – skipping AI call");
    return "AI temporarily unavailable.";
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
