import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* -------------------------
   CLEAN HTML
-------------------------- */
function cleanHTML(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 5000);
}

/* -------------------------
   SEO ENGINE
-------------------------- */
function calculateSEO(html, content) {
  let onPage = 100;
  let technical = 100;
  const issues = [];

  const hasTitle = /<title>/i.test(html);
  const hasMeta = /meta name="description"/i.test(html);
  const h1Count = (html.match(/<h1/gi) || []).length;
  const wordCount = content.split(" ").length;
  const hasSchema = html.includes("application/ld+json");
  const hasViewport = /viewport/i.test(html);

  // Basic checks
  if (!hasTitle) {
    onPage -= 20;
    issues.push("Missing title tag");
  }

  if (!hasMeta) {
    onPage -= 20;
    issues.push("Missing meta description");
  }

  if (h1Count === 0) {
    onPage -= 15;
    issues.push("No H1 heading");
  }

  if (wordCount < 400) {
    onPage -= 15;
    issues.push("Low content depth");
  }

  if (!hasSchema) {
    technical -= 20;
    issues.push("No structured data schema");
  }

  if (!hasViewport) {
    technical -= 15;
    issues.push("Mobile optimization missing");
  }

  // Internal links
  const internalLinks =
    (html.match(/<a\s+href="\/(?!\/)/gi) || []).length;

  if (internalLinks < 3) {
    onPage -= 10;
    issues.push("Weak internal linking");
  }

  // Image alt check
  const images = (html.match(/<img/gi) || []).length;
  const altMissing =
    (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;

  if (images > 0 && altMissing > 0) {
    technical -= 10;
    issues.push("Images missing alt attributes");
  }

  if (onPage < 0) onPage = 0;
  if (technical < 0) technical = 0;

  const overall = Math.round(onPage * 0.6 + technical * 0.4);

  return {
    overall,
    onPage,
    technical,
    local: hasSchema ? 75 : 45,
    issues: issues.slice(0, 6),
  };
}

/* -------------------------
   TRAFFIC ESTIMATION
-------------------------- */
function estimateTrafficLoss(score, competition = "Medium") {
  const baseSearchVolume =
    competition === "High"
      ? 15000
      : competition === "Low"
      ? 3000
      : 8000;

  const visibilityFactor = score / 100;
  const estimatedTraffic = Math.floor(
    baseSearchVolume * visibilityFactor * 0.2
  );

  const missedTraffic = baseSearchVolume - estimatedTraffic;

  const conversionRate = 0.03;
  const avgOrderValue = 1500;

  const estimatedLeads = Math.floor(
    missedTraffic * conversionRate
  );

  const revenueLoss = estimatedLeads * avgOrderValue;

  return {
    monthlyVisitorsLost: missedTraffic,
    estimatedLeadsLost: estimatedLeads,
    monthlyRevenueLoss: revenueLoss,
  };
}

/* -------------------------
   SAFE AI PARSE
-------------------------- */
function safeParseAI(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error();
    return JSON.parse(match[0]);
  } catch {
    return {
      type: "Unknown",
      industry: "Unknown",
      location: "Unknown",
      competition: "Medium",
      keywords: [],
    };
  }
}

/* -------------------------
   API HANDLER
-------------------------- */
export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url?.startsWith("http")) {
      return Response.json(
        { error: "Invalid URL" },
        { status: 400 }
      );
    }

    // Fetch with timeout
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      8000
    );

    const res = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return Response.json(
        { error: "Website not reachable" },
        { status: 400 }
      );
    }

    const html = await res.text();
    const content = cleanHTML(html);

    /* -------- AI BUSINESS DETECTION -------- */
    const aiPrompt = `
Identify business type, industry, location and competition level.
Return ONLY valid JSON:

{
  "type": "",
  "industry": "",
  "location": "",
  "competition": "Low | Medium | High",
  "keywords": []
}

Website content:
${content}
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: aiPrompt },
        ],
        temperature: 0.1,
        max_tokens: 400,
      });

    const aiData = safeParseAI(
      completion.choices[0].message.content
    );

    /* -------- SEO ENGINE -------- */
    const seo = calculateSEO(html, content);

    /* -------- TRAFFIC -------- */
    const traffic = estimateTrafficLoss(
      seo.overall,
      aiData.competition
    );

    /* -------- PRO LOGIC -------- */
    const criticalIssues = seo.issues.some(
      (issue) =>
        issue.includes("Missing title") ||
        issue.includes("Missing meta") ||
        issue.includes("No H1")
    );

    const showPro =
      seo.overall < 80 ||
      criticalIssues ||
      traffic.monthlyRevenueLoss > 15000;

    return Response.json({
      success: true,
      business: {
        type: aiData.type,
        industry: aiData.industry,
        location: aiData.location,
        competition: aiData.competition,
      },
      seoScore: {
        overall: seo.overall,
        onPage: seo.onPage,
        technical: seo.technical,
        local: seo.local,
      },
      topKeywords: aiData.keywords.slice(0, 5),
      issues: seo.issues,
      missedTraffic: traffic,
      showPro,
    });

  } catch (err) {
    console.error("SEO ANALYSIS ERROR:", err);
    return Response.json(
      { error: "AI analysis failed" },
      { status: 500 }
    );
  }
}