import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    `User-agent: *
Allow: /

Sitemap: https://business-ranking-ai.vercel.app/sitemap.xml`,
    {
      headers: { "Content-Type": "text/plain" },
    }
  );
}
