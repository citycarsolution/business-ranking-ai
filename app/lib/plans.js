// app/lib/plans.js

export const PLANS = {
  basic: {
    name: "Basic",
    price: 999,
    keywords: 15,
    features: [
      "Basic SEO Analysis",
      "15 Keywords Tracking",
      "Limited Reports",
    ],
  },

  pro: {
    name: "Pro",
    price: 1999,
    keywords: 30,
    features: [
      "Advanced SEO Analysis",
      "30 Keywords Tracking",
      "Priority AI Suggestions",
      "Weekly Reports",
    ],
  },

  agency: {
    name: "Agency",
    price: 2999,
    keywords: 999,
    features: [
      "Unlimited Keywords",
      "Full SEO Automation",
      "Client Management",
      "Priority Support",
    ],
  },
};

/**
 * Get plan details safely
 */
export function getPlan(planKey) {
  return PLANS[planKey] || null;
}

/**
 * Check if user can track more keywords
 */
export function canUseKeywords(planKey, usedCount) {
  const plan = PLANS[planKey];
  if (!plan) return false;
  return usedCount < plan.keywords;
}

/**
 * Get plan price
 */
export function getPlanPrice(planKey) {
  return PLANS[planKey]?.price || 0;
}
