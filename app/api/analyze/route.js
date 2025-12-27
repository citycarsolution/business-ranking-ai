import { NextResponse } from "next/server";

// ✅ Correct relative imports (NO alias issues)
import { analyzeWebsite } from "../../lib/ai/analyzer";
import { shouldUseGemini } from "../../lib/ai/decision";
import { getGeminiResponse } from "../../lib/ai/gemini";

export async function POST(req) {
  try {
    const body = await req.json();

    const analysis = analyzeWebsite(body);

    let aiMessage = null;

    if (shouldUseGemini(analysis)) {
      aiMessage = await getGeminiResponse(analysis.issues);
    }

    return NextResponse.json({
      success: true,
      score: analysis.score,
      issues: analysis.issues,
      aiMessage,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
