import { NextResponse } from "next/server";

export async function GET() {
  // TEMP: Direct AI-style response (no queue)
  return NextResponse.json({
    status: "improving",
    previousScore: 62,
    currentScore: 81,
    lastUpdate: "Today",

    fixes: [
      "SEO title optimized",
      "Meta description rewritten",
      "Content expanded (300 → 850 words)",
      "Keywords placed naturally"
    ],

    content: {
      title: "Affordable Cab Service in Delhi | 24x7 Taxi Booking",
      meta:
        "Book reliable cab services in Delhi with instant pickup, affordable pricing and professional drivers.",
      body:
        "Looking for a reliable cab service in Delhi? Our professional drivers and well-maintained vehicles ensure a comfortable journey across the city. We offer 24x7 taxi booking with transparent pricing and instant confirmation."
    }
  });
}
