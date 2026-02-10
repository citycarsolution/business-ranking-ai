import { NextResponse } from "next/server";
import { groq } from "@/app/lib/ai/groq";

export async function POST(req) {
  try {
    const { business, keywords = [], plan = "FREE", url } = await req.json();

    if (!business || !business.services || !keywords.length) {
      throw new Error("SEO input data missing");
    }

    // 🔒 PLAN CHECK
    if (plan !== "PRO" && plan !== "PREMIUM") {
      return NextResponse.json(
        { ok: false, error: "Upgrade required for Auto-SEO" },
        { status: 403 }
      );
    }

    const primary = keywords.slice(0, 3);
    const secondary = keywords.slice(3, 8);

    const prompt = `
You are a professional SEO expert.

Website URL: ${url}
Business Type: ${business.business_type}
Services: ${business.services.join(", ")}

Primary Keywords: ${primary.join(", ")}
Secondary Keywords: ${secondary.join(", ")}

Rules:
- DO NOT edit website
- DO NOT suggest hacking or risky actions
- Only SAFE SEO planning

Return ONLY valid JSON in this structure:

{
  "progress": 80,
  "meta": [
    { "page": "/", "title": "", "description": "" }
  ],
  "headings": [
    { "page": "/", "h1": "", "h2": [] }
  ],
  "content_suggestions": [
    { "page": "/", "suggestion": "" }
  ],
  "local_seo": {
    "gmb_description": "",
    "service_keywords": []
  },
  "completed": [],
  "developer_required": []
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0].message.content;
    const seoAssets = JSON.parse(raw);

    // 🔧 Force SAFE developer boundary
    seoAssets.completed = [
      "Meta title & description optimization",
      "Keyword mapping to service pages",
      "Heading structure planning (H1–H3)",
      "Internal linking suggestions",
      "Local SEO landing structure",
      "Content improvement recommendations",
    ];

    seoAssets.developer_required = [
      "Schema Markup (JSON-LD)",
      "Core Web Vitals optimization",
      "Image alt tags & compression",
      "Internal linking implementation",
      "Advanced technical fixes",
    ];

    return NextResponse.json({
      ok: true,
      autoSeo: seoAssets,
    });

  } catch (err) {
    console.error("AUTO SEO ERROR:", err.message);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
