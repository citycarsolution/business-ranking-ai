import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/app/lib/ai/analyzer";
import { shouldUseAI } from "@/app/lib/ai/aiDecision";
import { getGroqResponse } from "@/app/lib/ai/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { url, keywords } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const analysis = await analyzeWebsite({ url, keywords });

    let aiMessage = null;

    if (shouldUseAI(analysis)) {
      if (process.env.GROQ_API_KEY) {
        aiMessage = await getGroqResponse(analysis.issues);
      } else {
        aiMessage = "AI temporarily unavailable.";
      }
    }

    return NextResponse.json({
      score: analysis.score,
      issues: analysis.issues,
      aiMessage,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
