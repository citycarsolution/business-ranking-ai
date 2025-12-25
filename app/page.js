"use client";

import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    const keywordList = keywords
      .split("\n")
      .map(k => k.trim())
      .filter(Boolean);

    if (!url) {
      setError("Website URL required");
      return;
    }

    if (keywordList.length === 0) {
      setError("Enter at least 1 keyword");
      return;
    }

    if (keywordList.length > 8) {
      setError("Free version allows only 8 keywords. Upgrade to unlock more.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, keywords: keywordList })
      });

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">

        {/* HERO */}
        <h1 className="text-4xl font-bold text-center leading-tight">
          Free Business Ranking & SEO Checker
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Find out why your website is not ranking on Google and what to fix.
        </p>

        {/* INPUT FORM */}
        <div className="mt-8 space-y-4">
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter your website URL"
            className="w-full border rounded-lg px-4 py-3"
          />

          <textarea
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
            rows={4}
            placeholder="Enter up to 8 keywords (one per line)"
            className="w-full border rounded-lg px-4 py-3"
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Analyzing..." : "Check Business Ranking"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-8 bg-gray-100 rounded-lg p-5 text-sm">
            <p className="font-semibold mb-3">Free SEO Insights</p>

            <ul className="list-disc pl-5 space-y-1">
              {result.insights.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <a
              href="/upgrade"
              className="inline-block mt-4 text-blue-700 font-semibold"
            >
              🔓 Unlock full SEO support & exact fixes →
            </a>
          </div>
        )}

        {/* FREE VS PAID */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Free vs Paid SEO Support
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="border rounded-xl p-5 bg-gray-50">
              <h3 className="font-semibold text-lg mb-2">Free Check</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Up to 8 keywords</li>
                <li>Basic SEO signals</li>
                <li>General insights</li>
                <li>No action plan</li>
              </ul>
            </div>

            <div className="border-2 border-black rounded-xl p-5 bg-white">
              <h3 className="font-semibold text-lg mb-2">
                Paid SEO Support
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Unlimited keywords</li>
                <li>Exact page-wise fixes</li>
                <li>Priority keyword focus</li>
                <li>30-day active support</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/upgrade"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold"
            >
              Upgrade & Fix SEO →
            </a>
            <p className="mt-2 text-xs text-gray-500">
              Starts at ₹999 · No auto billing
            </p>
          </div>
        </section>

        {/* SEO FOOTER */}
        <footer className="mt-12 text-xs text-center text-gray-500 leading-relaxed">
          Business Ranking AI helps business owners understand Google ranking,
          SEO issues, website visibility, and growth opportunities.
          <br />
          Manual review · Business-safe SEO · No signup required
        </footer>

      </div>
    </main>
  );
}
