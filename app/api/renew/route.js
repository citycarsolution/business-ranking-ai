import { readDB, writeDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // 🔒 Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const db = readDB();

    const user = db.payments.find(p => p.email === email);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const now = Date.now();
    const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

    // ✅ Renew or activate
    if (user.status === "active" && user.expiresAt > now) {
      user.expiresAt += ONE_MONTH;
    } else {
      user.status = "active";
      user.activatedAt = now;
      user.expiresAt = now + ONE_MONTH;
    }

    user.updatedAt = now;

    writeDB(db);

    return NextResponse.json({
      success: true,
      message: "Subscription renewed successfully",
      expiresAt: user.expiresAt
    });

  } catch (error) {
    console.error("RENEW ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
