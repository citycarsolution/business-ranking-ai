export function analyzeWebsite(data) {
  let score = 100;
  let issues = [];

  if (!data.url) {
    issues.push("Website URL missing");
    score -= 20;
  }

  if (!data.keywords || data.keywords.length === 0) {
    issues.push("No keywords provided");
    score -= 15;
  }

  if (!data.metaDescription) {
    issues.push("Meta description missing");
    score -= 10;
  }

  if (!data.h1) {
    issues.push("H1 tag missing");
    score -= 10;
  }

  if (data.wordCount && data.wordCount < 600) {
    issues.push("Content too short (less than 600 words)");
    score -= 15;
  }

  return {
    score: Math.max(score, 0),
    issues,
  };
}
