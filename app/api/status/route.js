import { readDB, writeDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  const db = readDB();

  const user = db.payments.find(p => p.email === email && p.status === "active");

  if (!user) {
    return NextResponse.json({ status: "inactive" });
  }

  if (Date.now() > user.expiresAt) {
    user.status = "expired";
    writeDB(db);
    return NextResponse.json({ status: "expired" });
  }

  return NextResponse.json({
    status: "active",
    expiresAt: user.expiresAt
  });
}
