export const metadata = {
  title: "SEO & Business Ranking Guides",
  description:
    "Learn why business websites don't rank on Google and how to fix it."
};

export default function Blog() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        SEO & Business Ranking Guides
      </h1>

      <ul className="space-y-4">
        <li>
          <a
            href="/blog/why-website-not-ranking"
            className="text-blue-700 font-semibold"
          >
            Why Your Website Is Not Ranking on Google
          </a>
        </li>
        <li>
          <a
            href="/blog/how-to-improve-business-ranking"
            className="text-blue-700 font-semibold"
          >
            How to Improve Business Ranking in 30 Days
          </a>
        </li>
      </ul>
    </main>
  );
}
