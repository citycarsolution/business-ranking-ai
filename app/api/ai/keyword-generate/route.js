import { NextResponse } from "next/server";
import { groq } from "@/app/lib/ai/groq";

export async function POST(req) {
  try {
    const { business } = await req.json();

    if (!business || !Array.isArray(business.services)) {
      return NextResponse.json(
        { ok: false, error: "Business services missing" },
        { status: 400 }
      );
    }

    const prompt = `
Generate SEO keywords.

Business: ${business.business_type}
Services: ${business.services.join(", ")}

Rules:
- ONLY valid JSON array
- Minimum 15 keywords
- No text outside JSON
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    let raw = completion.choices[0]?.message?.content || "";

    // 🔒 STRONG JSON EXTRACTION
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("AI did not return JSON array");
    }

    const keywords = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(keywords) || keywords.length < 5) {
      throw new Error("Invalid keyword list");
    }

    return NextResponse.json({
      ok: true,
      keywords,
    });
  } catch (err) {
    console.error("KEYWORD ERROR:", err.message);

    // ✅ SAFE FALLBACK (VERY IMPORTANT)
    return NextResponse.json({
      ok: true,
      keywords: [
        "taxi booking service",
        "ride sharing app",
        "car rental service",
        "online taxi booking",
        "local taxi near me",
        "airport taxi service",
        "cab booking online",
        "ride hailing service",
        "transportation services",
        "book cab online",
        "city taxi service",
        "on demand cab",
        "best taxi service",
        "cheap taxi booking",
        "24x7 cab service"
      ]
    });
  }
}
