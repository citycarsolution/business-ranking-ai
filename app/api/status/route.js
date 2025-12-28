import { readDB, writeDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // 🔒 Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { status: "error", message: "Invalid email" },
        { status: 400 }
      );
    }

    const db = readDB();
    const user = db.payments.find(p => p.email === email);

    if (!user) {
      return NextResponse.json({ status: "not_found" });
    }

    const now = Date.now();

    // ⛔ Expired user
    if (user.status === "active" && now > user.expiresAt) {
      user.status = "expired";
      writeDB(db);

      return NextResponse.json({
        status: "expired",
        message: "Your plan has expired. Please renew."
      });
    }

    // 🚫 Inactive user
    if (user.status !== "active") {
      return NextResponse.json({
        status: "inactive",
        message: "Account not active"
      });
    }

    // ✅ Active user
    return NextResponse.json({
      status: "active",
      expiresAt: user.expiresAt,
      actions: [
        {
          title: "Fix Homepage Title",
          detail: "Keep title under 60 characters and include main keyword."
        },
        {
          title: "Add Proper H1",
          detail: "Use exactly one H1 tag with your primary keyword."
        },
        {
          title: "Improve Page Speed",
          detail: "Compress images and enable caching."
        },
        {
          title: "Internal Linking",
          detail: "Link important pages from homepage."
        },
        {
          title: "Local SEO",
          detail: "Add city + business keyword in schema and footer."
        }
      ]
    });

  } catch (error) {
    console.error("STATUS API ERROR:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
