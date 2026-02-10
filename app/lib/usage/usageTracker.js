import Usage from "@/lib/db/usage.model";

export async function trackUsage(userId) {
  await Usage.create({
    user: userId,
    date: new Date()
  });
}
