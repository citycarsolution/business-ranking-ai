import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Business Detect API is alive. Use POST with { url }",
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a business analyzer. Respond ONLY in valid JSON.",
        },
        {
          role: "user",
          content: `
Analyze this website URL and return JSON only:
{
  "website_type": "",
  "business_type": "",
  "services": []
}
URL: ${url}
          `,
        },
      ],
      temperature: 0.2,
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      throw new Error("Empty AI response");
    }

    const data = JSON.parse(raw);

    return NextResponse.json(data);
  } catch (err) {
    console.error("BUSINESS DETECT ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
