import { readDB, writeDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, txnId, plan } = body;

  if (!email || !txnId || !plan) {
    return NextResponse.json(
      { status: "error", message: "Missing fields" },
      { status: 400 }
    );
  }

  const db = readDB();

  // Same email ke purane records hata do (renew case)
  const filtered = db.payments.filter(p => p.email !== email);

  filtered.push({
    email,
    txnId,
    plan,               // basic | pro | agency
    status: "pending",  // pending → active
    activatedAt: null,
    expiresAt: null
  });

  db.payments = filtered;
  writeDB(db);

  return NextResponse.json({ status: "received" });
}
