export function shouldUseGemini(analysis) {
  return analysis.issues.length > 0;
}
