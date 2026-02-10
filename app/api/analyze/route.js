export async function POST(req) {
  try {
    const { url, keywords = "" } = await req.json();

    if (!url || !url.startsWith("http")) {
      return Response.json({ error: "Valid URL required" }, { status: 400 });
    }

    /* =========================
       A️⃣ FETCH REAL HTML
    ========================= */
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (BusinessRankingAI Bot)"
      },
      redirect: "follow"
    });

    if (!res.ok) {
      return Response.json(
        { error: "Website not reachable" },
        { status: 400 }
      );
    }

    const html = await res.text();
    const text = html.toLowerCase();

    /* =========================
       BASIC EXTRACTION
    ========================= */
    const title = (html.match(/<title>(.*?)<\/title>/i)?.[1] || "").trim();
    const h1 = (html.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1] || "").trim();
    const metaDesc = html.match(/<meta name="description" content="(.*?)"/i)?.[1] || "";
    const wordCount = text.split(/\s+/).length;

    /* =========================
       BUSINESS TYPE (REAL SIGNAL)
    ========================= */
    let businessType = "general";
    let service = 0, ecommerce = 0, blog = 0;

    if (text.includes("cab") || text.includes("taxi")) service += 2;
    if (text.includes("booking") || text.includes("call now")) service += 1;

    if (text.includes("add to cart")) ecommerce += 2;
    if (text.includes("buy now") || text.includes("price")) ecommerce += 1;

    if (text.includes("blog") || wordCount > 1200) blog += 2;

    const max = Math.max(service, ecommerce, blog);
    if (max === service && max > 0) businessType = "local-service";
    else if (max === ecommerce) businessType = "ecommerce";
    else if (max === blog) businessType = "content";

    /* =========================
       B️⃣ CONTENT + KEYWORD SEO
    ========================= */
    const keywordList = keywords.toLowerCase().split(",").map(k => k.trim()).filter(Boolean);
    let keywordScore = 0;
    let keywordHits = [];

    keywordList.forEach(k => {
      if (title.toLowerCase().includes(k)) {
        keywordScore += 10;
        keywordHits.push(`Keyword "${k}" in title`);
      }
      if (h1.toLowerCase().includes(k)) {
        keywordScore += 10;
        keywordHits.push(`Keyword "${k}" in H1`);
      }
      if (text.includes(k)) {
        keywordScore += 5;
        keywordHits.push(`Keyword "${k}" in content`);
      }
    });

    if (keywordScore > 30) keywordScore = 30;

    /* =========================
       C️⃣ TECHNICAL SEO (SECTION WISE)
    ========================= */
    const technical = {
      title: title.length >= 15 && title.length <= 60 ? 20 : 0,
      h1: h1.length > 5 ? 20 : 0,
      meta: metaDesc.length >= 50 && metaDesc.length <= 160 ? 15 : 0,
      content: wordCount > 300 ? 25 : 0,
      links: text.includes("<a href") ? 10 : 0,
      https: url.startsWith("https") ? 10 : 0
    };

    const technicalScore = Object.values(technical).reduce((a, b) => a + b, 0);

    const issues = [];
    if (!technical.title) issues.push("Title not optimized");
    if (!technical.h1) issues.push("H1 missing");
    if (!technical.meta) issues.push("Meta description missing");
    if (!technical.content) issues.push("Low content length");
    if (!technical.links) issues.push("No internal links");
    if (!technical.https) issues.push("HTTPS not enabled");

    /* =========================
       D️⃣ FREE vs PAID LIMIT
    ========================= */
    const isFreeUser = true; // later auth se aayega

    const finalScore = isFreeUser
      ? Math.min(technicalScore + keywordScore, 60)
      : Math.min(technicalScore + keywordScore, 100);

    /* =========================
       FINAL RESPONSE (UI READY)
    ========================= */
    return Response.json({
      success: true,
      url,
      businessType,

      scores: {
        overall: finalScore,
        technical: technicalScore,
        keyword: keywordScore
      },

      breakdown: {
        technical,
        keywordHits,
        extracted: {
          title,
          h1,
          metaDesc,
          wordCount
        }
      },

      issues,

      plan: isFreeUser ? "FREE" : "PRO"
    });

  } catch (e) {
    return Response.json(
      { error: "SEO analysis failed" },
      { status: 500 }
    );
  }
}
