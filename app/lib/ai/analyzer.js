export function analyzeWebsite(data) {
  let score = 100;
  let issues = [];

  if (!data.metaDescription) {
    score -= 15;
    issues.push("Meta description missing");
  }

  if (!data.h1) {
    score -= 10;
    issues.push("H1 tag missing");
  }

  if (data.wordCount < 600) {
    score -= 20;
    issues.push("Content is too short (less than 600 words)");
  }

  if (!data.mobileFriendly) {
    score -= 15;
    issues.push("Website not mobile friendly");
  }

  return {
    score,
    issues,
    status: score >= 70 ? "good" : "needs_improvement"
  };
}
