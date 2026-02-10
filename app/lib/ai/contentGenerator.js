import { getGroqResponse } from "./groq";
import { buildSeoPrompt } from "./promptBuilder";

export async function generateSeoContent({ url, keywords }) {
  const prompt = buildSeoPrompt({ url, keywords });
  const response = await getGroqResponse(prompt);
  return response;
}
