import axios from "axios";
import * as cheerio from "cheerio";

export async function analyzeWebsite({ url, keywords }) {
  let score = 100;
  let issues = [];

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // TITLE
    const title = $("title").text();
    if (!title) {
      issues.push("Missing <title> tag");
      score -= 15;
    }

    // META DESCRIPTION
    const metaDesc = $('meta[name="description"]').attr("content");
    if (!metaDesc) {
      issues.push("Meta description missing");
      score -= 10;
    }

    // H1
    const h1 = $("h1").first().text();
    if (!h1) {
      issues.push("Missing H1 tag");
      score -= 10;
    }

    // WORD COUNT
    const text = $("body").text();
    const words = text.split(/\s+/).length;
    if (words < 300) {
      issues.push("Low content length (less than 300 words)");
      score -= 15;
    }

    // KEYWORDS CHECK
    if (keywords && keywords.length > 0) {
      const content = text.toLowerCase();
      keywords.forEach((kw) => {
        if (!content.includes(kw.toLowerCase())) {
          issues.push(`Keyword not found: "${kw}"`);
          score -= 5;
        }
      });
    }

  } catch (err) {
    issues.push("Website not reachable or blocked");
    score = 0;
  }

  return {
    score: Math.max(score, 0),
    issues,
  };
}
