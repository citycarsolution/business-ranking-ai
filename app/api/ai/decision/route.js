import { NextResponse } from "next/server";

export async function POST(req) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json(
      { error: "URL required" },
      { status: 400 }
    );
  }

  // 🔹 VERY BASIC URL → BUSINESS MAPPING (MVP)
  let business = "General Service";
  let services = ["Service"];

  if (url.includes("seo") || url.includes("marketing")) {
    business = "SEO / Digital Marketing";
    services = ["SEO Services", "Website Optimization", "Digital Marketing"];
  } else if (url.includes("shop") || url.includes("store")) {
    business = "E-commerce";
    services = ["Online Store", "Product Sales"];
  } else if (url.includes("tech") || url.includes("app")) {
    business = "Web / App Development";
    services = ["Web Development", "App Development"];
  }

  return NextResponse.json({
    business,
    services,
    keywords: {
      low: [
        `${services[0]} company`,
        `${services[0]} solutions`,
        `${services[0]} provider`,
        `${services[0]} services`,
        `${services[0]} for business`,
      ],
      medium: [
        `professional ${services[0]}`,
        `best ${services[0]} agency`,
        `${services[0]} expert`,
        `${services[0]} near me`,
        `${services[0]} company in city`,
      ],
      high: [
        `hire ${services[0]}`,
        `${services[0]} pricing`,
        `${services[0]} cost`,
        `top ${services[0]} agency`,
        `${services[0]} services company`,
      ],
    },
  });
}
