import { NextResponse } from "next/server";

export async function GET() {
  const robots = `
User-agent: *
Allow: /

Sitemap: https://business-ranking-ai.vercel.app/sitemap.xml
  `.trim();

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
