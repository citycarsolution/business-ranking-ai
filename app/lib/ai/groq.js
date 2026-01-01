import Groq from "groq-sdk";

export async function getGroqResponse(issues) {
  if (!process.env.GROQ_API_KEY) {
    return "AI is currently unavailable.";
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "user",
        content: `Give SEO improvement suggestions for: ${issues.join(", ")}`
      }
    ],
  });

  return completion.choices[0].message.content;
}
