import axios from "axios";
import * as cheerio from "cheerio";

export async function analyzeWebsite({ url, keywords = [] }) {
  let score = 100;
  let issues = [];

  try {
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    /* ---------- TITLE CHECK ---------- */
    const title = $("title").text().trim();
    if (!title) {
      issues.push("Missing <title> tag");
      score -= 15;
    } else if (title.length < 30) {
      issues.push("Title too short (recommended 50–60 chars)");
      score -= 10;
    }

    /* ---------- META DESCRIPTION ---------- */
    const metaDesc = $('meta[name="description"]').attr("content");
    if (!metaDesc) {
      issues.push("Meta description missing");
      score -= 10;
    } else if (metaDesc.length < 70) {
      issues.push("Meta description too short");
      score -= 5;
    }

    /* ---------- H1 TAG ---------- */
    const h1Count = $("h1").length;
    if (h1Count === 0) {
      issues.push("No H1 tag found");
      score -= 10;
    } else if (h1Count > 1) {
      issues.push("Multiple H1 tags found");
      score -= 5;
    }

    /* ---------- CONTENT LENGTH ---------- */
    const text = $("body").text().replace(/\s+/g, " ").trim();
    const wordCount = text.split(" ").length;

    if (wordCount < 300) {
      issues.push("Content is too short (less than 300 words)");
      score -= 15;
    }

    /* ---------- KEYWORD CHECK ---------- */
    if (Array.isArray(keywords)) {
      keywords.forEach((kw) => {
        if (!text.toLowerCase().includes(kw.toLowerCase())) {
          issues.push(`Keyword missing: "${kw}"`);
          score -= 5;
        }
      });
    }

  } catch (error) {
    console.error("Analyzer error:", error.message);
    return {
      score: 0,
      issues: ["Website unreachable or blocked by server"],
    };
  }

  return {
    score: Math.max(0, score),
    issues,
  };
}
