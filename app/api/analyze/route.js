import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/app/lib/ai/analyzer";
import { shouldUseGemini } from "@/app/lib/ai/decision";
import { getGeminiResponse } from "@/app/lib/ai/gemini";

export async function POST(req) {
  try {
    const body = await req.json();

    const analysis = analyzeWebsite(body);

    let aiMessage = null;

    if (shouldUseGemini(analysis)) {
      aiMessage = await getGeminiResponse(analysis.issues);
    }

    return NextResponse.json({
      score: analysis.score,
      issues: analysis.issues || [],
      aiMessage: aiMessage || null,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
