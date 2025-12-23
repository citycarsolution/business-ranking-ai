import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://business-ranking-ai.vercel.app";

  const staticPages = [
    "",
    "/login",
    "/dashboard",
    "/upgrade",
    "/pay",
  ];

  const cityPages = [
    "mumbai",
    "delhi",
    "pune",
    "bangalore",
    "hyderabad",
  ];

  const urls = [
    ...staticPages.map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
    ),
    ...cityPages.map(
      (city) => `
  <url>
    <loc>${baseUrl}/city/${city}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    ),
  ].join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
