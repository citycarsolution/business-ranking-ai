import { notFound } from "next/navigation";

/**
 * City SEO Data
 */
const CITY_DATA = {
  mumbai: {
    name: "Mumbai",
    description:
      "Check business ranking in Mumbai. Track Google visibility, keyword performance, and local SEO strength for Mumbai businesses.",
  },
  delhi: {
    name: "Delhi",
    description:
      "Analyze your business ranking in Delhi. Get insights on SEO health and keyword performance.",
  },
  pune: {
    name: "Pune",
    description:
      "Business ranking checker for Pune. Improve your local SEO visibility and Google presence.",
  },
  bangalore: {
    name: "Bangalore",
    description:
      "Check Google business ranking in Bangalore. SEO insights for startups and local businesses.",
  },
  hyderabad: {
    name: "Hyderabad",
    description:
      "Track your business ranking in Hyderabad. Improve SEO, keyword rankings, and Google visibility.",
  },
};

/**
 * Static generation for SEO
 */
export function generateStaticParams() {
  return Object.keys(CITY_DATA).map((slug) => ({ slug }));
}

/**
 * SEO Metadata
 */
export function generateMetadata({ params }) {
  const city = CITY_DATA[params.slug];

  if (!city) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Business Ranking in ${city.name} | Business Ranking AI`,
    description: city.description,
    alternates: {
      canonical: `https://business-ranking-ai.vercel.app/city/${params.slug}`,
    },
    openGraph: {
      title: `Business Ranking in ${city.name}`,
      description: city.description,
      url: `https://business-ranking-ai.vercel.app/city/${params.slug}`,
      siteName: "Business Ranking AI",
      type: "website",
      locale: "en_IN",
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
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl md:text-4xl font-bold">
          Business Ranking in {city.name}
        </h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          {city.description}
        </p>

        <section className="grid md:grid-cols-2 gap-6 mt-8">
          <Feature
            title="Local SEO Insights"
            desc={`Understand how your business performs in ${city.name} searches and map results.`}
          />
          <Feature
            title="Keyword Ranking Analysis"
            desc="Track keyword movement and identify ranking opportunities."
          />
          <Feature
            title="SEO Recommendations"
            desc="Actionable steps to improve on-page, technical, and off-page SEO."
          />
          <Feature
            title="Free + Paid Growth Path"
            desc="Start free and unlock advanced SEO insights anytime."
          />
        </section>

        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Check Your Business Ranking →
          </a>
        </div>
      </div>
    </main>
  );
}

/**
 * Reusable Card Component
 */
function Feature({ title, desc }) {
  return (
    <div className="border rounded-xl p-5 hover:shadow transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}
