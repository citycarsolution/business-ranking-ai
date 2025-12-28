import { notFound } from "next/navigation";

const BLOG_CONTENT = {
  "why-website-not-ranking": {
    title: "Why Your Website Is Not Ranking on Google",
    description:
      "Discover the top reasons why your website is not ranking on Google and how to fix SEO issues effectively.",
    content: `
      Many websites fail to rank on Google because of poor SEO structure,
      weak content, missing keywords, or slow page speed.
      
      In this guide, we explain:
      - Why Google ignores your website
      - Common SEO mistakes
      - How to fix them using smart tools
    `,
  },

  "how-to-improve-business-ranking": {
    title: "How to Improve Business Ranking – Step by Step",
    description:
      "Learn proven SEO strategies to improve your business ranking and get more traffic.",
    content: `
      Improving business ranking requires consistency and the right strategy.
      This guide covers:
      - On-page SEO
      - Technical SEO
      - Content optimization
      - Local SEO tips
    `,
  },
};

export function generateMetadata({ params }) {
  const post = BLOG_CONTENT[params.slug];

  if (!post) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default function BlogPost({ params }) {
  const post = BLOG_CONTENT[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <article>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {post.content}
        </p>
      </article>
    </main>
  );
}
