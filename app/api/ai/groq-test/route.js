import { NextResponse } from "next/server";
import { groq } from "@/app/lib/ai/groq";

export async function POST() {
  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Say OK in JSON" }],
    });

    return NextResponse.json({
      raw: res.choices[0].message.content,
    });
  } catch (e) {
    return NextResponse.json(
      { error: String(e) },
      { status: 500 }
    );
  }
}
