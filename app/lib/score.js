/**
 * SEO Score Calculator
 * Calculates score based on issue severity
 */

export function calculateScore(issues = []) {
  if (!Array.isArray(issues)) return 0;

  let score = 100;

  issues.forEach((issue) => {
    switch (issue.severity) {
      case "critical":
        score -= 25;
        break;
      case "high":
        score -= 15;
        break;
      case "medium":
        score -= 8;
        break;
      case "low":
        score -= 4;
        break;
      default:
        score -= 5;
    }
  });

  return Math.max(0, Math.min(100, score));
}

/**
 * SEO Risk Level
 */
export function calculateRisk(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Critical";
}

/**
 * SEO Health Message
 */
export function getHealthMessage(score) {
  if (score >= 85)
    return "Great job! Your website SEO health is excellent.";
  if (score >= 70)
    return "Your SEO is good, but there is room for improvement.";
  if (score >= 50)
    return "SEO needs improvement to compete better.";
  return "Critical SEO issues detected. Immediate action required.";
}
