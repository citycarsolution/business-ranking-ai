export function generateMetadata({ params }) {
  const titles = {
    "why-website-not-ranking":
      "Why Your Website Is Not Ranking on Google",
    "how-to-improve-business-ranking":
      "How to Improve Business Ranking – Step by Step"
  };

  return {
    title: titles[params.slug] || "SEO Guide",
    description:
      "Understand SEO issues and improve your business ranking on Google."
  };
}

export default function BlogPost({ params }) {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        {params.slug.replace(/-/g, " ")}
      </h1>

      <p className="text-gray-700">
        This guide explains common SEO mistakes that prevent businesses
        from ranking on Google and how to fix them using Business Ranking AI.
      </p>
    </main>
  );
}
