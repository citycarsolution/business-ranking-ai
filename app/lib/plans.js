export const PLANS = {
  free: {
    content: false,
    keyword: false,
    autofix: false,
  },
  pro: {
    content: true,
    keyword: true,
    autofix: true,
  },
};

export function isLocked(section, plan = "free") {
  return !PLANS[plan]?.[section];
}
