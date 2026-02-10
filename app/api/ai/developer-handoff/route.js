import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { autoSeo, userId, plan } = await req.json();

    if (!autoSeo?.developer_required?.length) {
      return NextResponse.json({ ok: true, message: "No developer needed" });
    }

    // Save task (DB later)
    const task = {
      userId,
      tasks: autoSeo.developer_required,
      status: "pending",
      priority: "high",
      createdAt: new Date(),
    };

    return NextResponse.json({
      ok: true,
      developerTask: task,
      upsell: plan === "PRO",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
