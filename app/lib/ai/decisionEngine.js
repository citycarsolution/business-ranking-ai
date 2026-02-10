export function decisionEngine({
  technicalIssues = [],
  accessLevel = "read-only",
  totalPages = 1,
  isEcommerce = false,
  multiLocation = false,
  daysRunning = 0,
  improvementRate = 0,
  overOptimizationRisk = "low",
  duplicationRisk = "low",
}) {
  // PRIORITY 1: SEO RISK
  if (overOptimizationRisk === "high" || duplicationRisk === "high") {
    return {
      needHuman: true,
      reasonType: "SEO_RISK",
      reasonTitle: "SEO Risk Detected",
      reasonMessage:
        "Automated changes may negatively affect rankings. Expert review is recommended.",
    };
  }

  // PRIORITY 2: TECH LIMIT
  if (
    technicalIssues.includes("server") ||
    accessLevel === "read-only"
  ) {
    return {
      needHuman: true,
      reasonType: "TECH_LIMIT",
      reasonTitle: "Technical Limitation",
      reasonMessage:
        "Some SEO fixes require server or code-level access.",
    };
  }

  // PRIORITY 3: COMPLEX SITE
  if (totalPages > 100 || isEcommerce || multiLocation) {
    return {
      needHuman: true,
      reasonType: "COMPLEX_SITE",
      reasonTitle: "Complex Website Structure",
      reasonMessage:
        "This website needs a custom SEO strategy beyond automation.",
    };
  }

  // PRIORITY 4: GROWTH STUCK
  if (daysRunning >= 14 && improvementRate < 5) {
    return {
      needHuman: true,
      reasonType: "GROWTH_STUCK",
      reasonTitle: "SEO Growth Plateau",
      reasonMessage:
        "AI optimizations have reached their limit. Manual intervention can unlock further growth.",
    };
  }

  return { needHuman: false };
}
