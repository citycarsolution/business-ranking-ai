import { readDB, writeDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  const db = readDB();

  const user = db.payments.find(p => p.email === email);

  if (!user) {
    return NextResponse.json({ status: "no_user" });
  }

  const now = Date.now();

  // If active → extend from existing expiry
  if (user.status === "active" && user.expiresAt > now) {
    user.expiresAt = user.expiresAt + 30 * 24 * 60 * 60 * 1000;
  } else {
    // expired / inactive → start fresh
    user.status = "active";
    user.activatedAt = now;
    user.expiresAt = now + 30 * 24 * 60 * 60 * 1000;
  }

  writeDB(db);

  return NextResponse.json({
    status: "renewed",
    expiresAt: user.expiresAt
  });
}
