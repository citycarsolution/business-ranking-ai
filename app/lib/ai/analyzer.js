export function analyzeWebsite(data = {}) {
  let score = 100;
  let issues = [];

  // Safety defaults
  const {
    metaDescription = "",
    h1 = "",
    wordCount = 0,
    mobileFriendly = true,
  } = data;

  // Meta Description Check
  if (!metaDescription || metaDescription.length < 50) {
    score -= 15;
    issues.push("Meta description missing or too short");
  }

  // H1 Tag Check
  if (!h1 || h1.length < 3) {
    score -= 10;
    issues.push("H1 tag missing or too short");
  }

  // Content Length Check
  if (wordCount < 600) {
    score -= 20;
    issues.push("Content is too short (less than 600 words)");
  }

  // Mobile Friendly Check
  if (!mobileFriendly) {
    score -= 15;
    issues.push("Website is not mobile friendly");
  }

  // Minimum score safety
  if (score < 0) score = 0;

  return {
    score,
    issues,
    status: score >= 70 ? "good" : "needs_improvement",
  };
}
