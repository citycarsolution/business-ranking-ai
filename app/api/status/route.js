import { readDB, writeDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  const db = readDB();

  const user = db.payments.find(p => p.email === email);

  if (!user) {
    return NextResponse.json({ status: "not_found" });
  }

  if (user.status !== "active") {
    return NextResponse.json({ status: "inactive" });
  }

  if (Date.now() > user.expiresAt) {
    user.status = "expired";
    writeDB(db);
    return NextResponse.json({ status: "expired" });
  }

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
        detail: "Link service pages from homepage."
      },
      {
        title: "Local SEO",
        detail: "Add city + business type in footer and schema."
      }
    ]
  });
}
