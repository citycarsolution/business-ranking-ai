export const ROLES = {
  OWNER: ["ALL"],
  ADMIN: ["ANALYZE", "REPORT", "TEAM"],
  MEMBER: ["ANALYZE"]
};

export function hasPermission(user, action) {
  return ROLES[user.role]?.includes(action) || ROLES[user.role]?.includes("ALL");
}
