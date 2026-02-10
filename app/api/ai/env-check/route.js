import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    hasKey: !!process.env.GROQ_API_KEY,
  });
}
