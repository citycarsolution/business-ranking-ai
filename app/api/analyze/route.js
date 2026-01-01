import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/app/lib/ai/analyzer";
import { shouldUseGemini } from "@/app/lib/ai/decision";
import { getGroqResponse } from "@/app/lib/ai/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { url, keywords } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Valid URL is required" },
        { status: 400 }
      );
    }

    // Run SEO analysis
    const analysis = await analyzeWebsite({ url, keywords });

    let aiMessage = null;

    if (shouldUseGemini(analysis)) {
      aiMessage = await getGroqResponse(analysis.issues); 
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
