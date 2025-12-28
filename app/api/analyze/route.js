import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/app/lib/ai/analyzer";
import { shouldUseGemini } from "@/app/lib/ai/decision";
import { getGeminiResponse } from "@/app/lib/ai/gemini";

// IMPORTANT: Force runtime execution (avoid static build crash)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 🔒 URL validation
function isValidURL(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// 🔒 Block fake / local URLs
function isBlockedURL(url) {
  return (
    url.includes("localhost") ||
    url.includes("127.0.0.1") ||
    url.includes("192.168")
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || !isValidURL(url)) {
      return NextResponse.json(
        { error: "Invalid website URL" },
        { status: 400 }
      );
    }

    if (isBlockedURL(url)) {
      return NextResponse.json(
        { error: "Local or private URLs are not allowed" },
        { status: 400 }
      );
    }

    // 🧠 Analyze website
    const analysis = analyzeWebsite(body);

    let aiMessage = null;

    if (shouldUseGemini(analysis)) {
      aiMessage = await getGeminiResponse(analysis.issues);
    }

    return NextResponse.json({
      score: analysis.score,
      issues: analysis.issues || [],
      aiMessage,
    });

  } catch (error) {
    console.error("Analyze API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
