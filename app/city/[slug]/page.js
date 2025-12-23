import { notFound } from "next/navigation";

/**
 * City data (easy to extend later)
 */
const CITY_DATA = {
  mumbai: {
    name: "Mumbai",
    description:
      "Check business ranking in Mumbai with AI-powered SEO analysis. Track Google visibility, keyword performance, and local SEO strength for Mumbai businesses.",
  },
  delhi: {
    name: "Delhi",
    description:
      "Analyze your business ranking in Delhi. Get insights on SEO health, Google ranking, and keyword performance for Delhi-based businesses.",
  },
  pune: {
    name: "Pune",
    description:
      "Business ranking checker for Pune. Understand how your website performs on Google and improve local SEO visibility in Pune.",
  },
  bangalore: {
    name: "Bangalore",
    description:
      "Check Google business ranking in Bangalore. AI-driven SEO insights for startups and local businesses in Bangalore.",
  },
  hyderabad: {
    name: "Hyderabad",
    description:
      "Track your business ranking in Hyderabad. Improve SEO, keyword rankings, and Google visibility with AI-powered analysis.",
  },
};

/**
 * SEO METADATA (Dynamic per city)
 */
export async function generateMetadata({ params }) {
  const city = CITY_DATA[params.slug];

  if (!city) return {};

  return {
    title: `Business Ranking in ${city.name} | Business Ranking AI`,
    description: city.description,
    keywords: [
      `business ranking ${city.name.toLowerCase()}`,
      `seo services ${city.name.toLowerCase()}`,
      `google ranking ${city.name.toLowerCase()}`,
      "seo checker",
      "business ranking ai",
    ],
    openGraph: {
      title: `Business Ranking in ${city.name}`,
      description: city.description,
      url: `https://business-ranking-ai.vercel.app/city/${params.slug}`,
      siteName: "Business Ranking AI",
      locale: "en_IN",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * PAGE COMPONENT
 */
export default function CityPage({ params }) {
  const city = CITY_DATA[params.slug];

  if (!city) notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold">
          Business Ranking in {city.name}
        </h1>

        {/* Intro */}
        <p className="mt-4 text-gray-700 leading-relaxed">
          {city.description}
        </p>

        {/* Value Points */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-lg">
              Local SEO Insights
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Understand how your business performs in local Google searches in{" "}
              {city.name}.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-lg">
              Keyword Ranking Analysis
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Track important keywords and see why competitors rank above you.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-lg">
              AI SEO Recommendations
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Actionable steps to improve on-page, off-page, and technical SEO.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-lg">
              Free + Paid Growth Path
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start free, then unlock full SEO support for faster growth.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold"
          >
            Check Your Business Ranking Now →
          </a>
        </div>

      </div>
    </main>
  );
}
