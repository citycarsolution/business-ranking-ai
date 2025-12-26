import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/lib/ai/analyzer";
import { shouldUseGemini } from "@/lib/ai/decision";
import { getGeminiResponse } from "@/lib/ai/gemini";

export async function POST(req) {
  const body = await req.json();

  const analysis = analyzeWebsite(body);

  let aiMessage = null;

  if (shouldUseGemini(analysis)) {
    aiMessage = await getGeminiResponse(analysis.issues);
  }

  return NextResponse.json({
    score: analysis.score,
    issues: analysis.issues,
    aiMessage,
  });
}
