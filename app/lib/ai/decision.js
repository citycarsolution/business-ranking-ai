export function shouldUseGemini(analysis) {
  // Safety check
  if (!analysis || !Array.isArray(analysis.issues)) return false;

  const score = Number(analysis.score) || 0;
  const issueCount = analysis.issues.length;

  // 🚨 Very poor SEO → must use AI
  if (score < 45) return true;

  // 🚨 Too many issues → AI required
  if (issueCount >= 3) return true;

  // ⚠️ Medium score but still needs guidance
  if (score >= 45 && score < 75 && issueCount >= 2) return true;

  // ✅ Good website → no AI needed
  return false;
}
