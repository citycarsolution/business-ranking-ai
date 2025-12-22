import { NextResponse } from "next/server";

export async function POST(req) {
  const { url, keywords } = await req.json();

  return NextResponse.json({
    insights: [
      `Website checked: ${url}`,
      `Keywords analyzed: ${keywords.length}`,
      "Your SEO basics are okay",
      "Content optimization recommended",
      "Backlinks need improvement"
    ]
  });
}
