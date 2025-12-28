import * as cheerio from "cheerio";

export async function analyzeWebsite(data) {
  const url = data.url;
  let score = 100;
  let issues = [];

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SEOChecker/1.0; +https://yourdomain.com)",
      },
    });

    if (!res.ok) {
      return {
        score: 0,
        issues: ["Website not reachable or blocked"],
      };
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Title
    const title = $("title").text();
    if (!title) {
      issues.push("Missing <title> tag");
      score -= 10;
    }

    // Meta Description
    const metaDesc = $('meta[name="description"]').attr("content");
    if (!metaDesc) {
      issues.push("Missing meta description");
      score -= 10;
    }

    // H1
    const h1 = $("h1").first().text();
    if (!h1) {
      issues.push("Missing H1 tag");
      score -= 10;
    }

    // Word count
    const text = $("body").text().replace(/\s+/g, " ").trim();
    const wordCount = text.split(" ").length;
    if (wordCount < 500) {
      issues.push("Content too short (less than 500 words)");
      score -= 15;
    }

    // Images without ALT
    const images = $("img");
    const imagesWithoutAlt = images.filter((i, el) => !$(el).attr("alt")).length;
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt text`);
      score -= 10;
    }

    return {
      score: Math.max(score, 0),
      issues,
    };
  } catch (error) {
    return {
      score: 0,
      issues: ["Failed to analyze website"],
    };
  }
}
