export default function sitemap() {
  const base = "https://business-ranking-ai.vercel.app";

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/upgrade`, lastModified: new Date() },
    { url: `${base}/dashboard`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() }
  ];
}
