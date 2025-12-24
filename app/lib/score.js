/**
 * SEO score calculator
 * Input: number of actions/issues
 */

export function calculateScore(actionCount = 0) {
  if (typeof actionCount !== "number") return 0;

  // Simple logic: fewer issues = higher score
  const score = 100 - actionCount * 10;

  return Math.max(0, Math.min(100, score));
}

/**
 * SEO risk label based on issue count
 */
export function calculateRisk(actionCount = 0) {
  if (typeof actionCount !== "number") return "Unknown";

  if (actionCount === 0) return "Low";
  if (actionCount <= 3) return "Medium";
  if (actionCount <= 6) return "High";

  return "Critical";
}
