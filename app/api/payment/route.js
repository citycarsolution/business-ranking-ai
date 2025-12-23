import { readDB, writeDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, txnId } = await req.json();
  const db = readDB();

  db.payments.push({
    email,
    txnId,
    status: "pending",
    activatedAt: null,
    expiresAt: null
  });

  writeDB(db);
  return NextResponse.json({ ok: true });
}
