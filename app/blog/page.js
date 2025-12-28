import Link from "next/link";

export const metadata = {
  title: "SEO & Business Ranking Guides | Business Ranking AI",
  description:
    "Learn why websites don’t rank on Google and how to improve your business ranking using proven SEO strategies.",
};

const BLOGS = [
  {
    slug: "why-website-not-ranking",
    title: "Why Your Website Is Not Ranking on Google",
    description:
      "Understand the real reasons your website is not ranking and how to fix SEO issues.",
  },
  {
    slug: "how-to-improve-business-ranking",
    title: "How to Improve Business Ranking in 30 Days",
    description:
      "Step-by-step SEO strategy to grow your business visibility on Google.",
  },
];

export default function Blog() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">
          SEO & Business Ranking Guides
        </h1>
        <p className="text-gray-600">
          Learn how to rank your business website on Google using proven SEO
          strategies.
        </p>
      </header>

      <section className="space-y-6">
        {BLOGS.map((post) => (
          <article
            key={post.slug}
            className="border p-5 rounded-lg hover:shadow transition"
          >
            <h2 className="text-xl font-semibold mb-1">
              <Link href={`/blog/${post.slug}`} className="text-blue-700">
                {post.title}
              </Link>
            </h2>

            <p className="text-gray-600">{post.description}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-2 text-sm text-blue-600 font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
