import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/app/lib/ai/analyzer";
import { shouldUseGemini } from "@/app/lib/ai/decision";
import { getGeminiResponse } from "@/app/lib/ai/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { url, keywords } = body;

    if (!url) {
      return NextResponse.json({ error: "URL missing" }, { status: 400 });
    }

    const analysis = await analyzeWebsite({ url, keywords });

    let aiMessage = null;

    if (shouldUseGemini(analysis)) {
      aiMessage = await getGeminiResponse(analysis.issues);
    }

    return NextResponse.json({
      score: analysis.score,
      issues: analysis.issues,
      aiMessage,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
