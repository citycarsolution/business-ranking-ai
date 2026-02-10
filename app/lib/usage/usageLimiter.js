import { PLANS } from "../plans";
import { getUsage, increaseUsage } from "./usageTracker";

export function canUseFeature(user, feature = "ai") {
  const plan = PLANS[user.plan || "FREE"];
  const used = getUsage(user.id);

  if (!plan[feature]) {
    return { allowed: false, reason: "upgrade_required" };
  }

  if (used >= plan.dailyLimit) {
    return { allowed: false, reason: "limit_reached" };
  }

  increaseUsage(user.id);
  return { allowed: true };
}
