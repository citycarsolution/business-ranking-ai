import { readDB, writeDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, txnId } = await req.json();

    // 🔒 Validation
    if (!email || !txnId) {
      return NextResponse.json(
        { error: "Email and transaction ID required" },
        { status: 400 }
      );
    }

    if (txnId.length < 6) {
      return NextResponse.json(
        { error: "Invalid transaction ID" },
        { status: 400 }
      );
    }

    const db = readDB();

    // 🔍 Prevent duplicate payment
    const alreadyExists = db.payments.find(
      (p) => p.txnId === txnId || p.email === email
    );

    if (alreadyExists) {
      return NextResponse.json(
        { error: "Payment already submitted" },
        { status: 409 }
      );
    }

    // ✅ Save payment
    db.payments.push({
      id: Date.now(),
      email,
      txnId,
      status: "pending",
      activatedAt: null,
      expiresAt: null,
      createdAt: new Date().toISOString(),
    });

    writeDB(db);

    return NextResponse.json({
      success: true,
      message: "Payment submitted successfully",
    });
  } catch (err) {
    console.error("Payment API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
