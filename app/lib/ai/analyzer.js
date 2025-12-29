import cheerio from "cheerio";

export async function analyzeWebsite({ url, keywords }) {
  let score = 100;
  let issues = [];

  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $("title").text();
    const metaDesc = $('meta[name="description"]').attr("content");
    const h1 = $("h1").first().text();
    const text = $("body").text();

    // TITLE
    if (!title) {
      issues.push("Missing title tag");
      score -= 15;
    }

    // META DESCRIPTION
    if (!metaDesc) {
      issues.push("Missing meta description");
      score -= 15;
    }

    // H1
    if (!h1) {
      issues.push("Missing H1 heading");
      score -= 10;
    }

    // KEYWORDS CHECK
    if (keywords?.length > 0) {
      const content = text.toLowerCase();
      keywords.forEach((kw) => {
        if (!content.includes(kw.toLowerCase())) {
          issues.push(`Keyword not found: ${kw}`);
          score -= 5;
        }
      });
    }

    // CONTENT LENGTH
    if (text.length < 600) {
      issues.push("Content too short (less than 600 characters)");
      score -= 10;
    }

  } catch (err) {
    issues.push("Unable to fetch website content");
    score -= 30;
  }

  return {
    score: Math.max(score, 0),
    issues,
  };
}
