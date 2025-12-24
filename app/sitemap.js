export default function sitemap() {
  const base = "https://business-ranking-ai.vercel.app";

  const staticPages = [
    "",
    "/upgrade",
    "/dashboard",
    "/blog",
  ];

  const cityPages = [
    "mumbai",
    "delhi",
    "pune",
    "bangalore",
    "hyderabad",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...cityPages.map((city) => ({
      url: `${base}/city/${city}`,
      lastModified: new Date(),
    })),
  ];
}
