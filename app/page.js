"use client";

import { useState } from "react";

export default function Home() {
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

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, keywords: keywordList })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Business-Ranking AI
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Free SEO & Business Ranking Checker
        </p>

        <div className="mt-6 space-y-4">
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

        {result && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm">
            <p className="font-semibold mb-2">Free SEO Insight:</p>
            <ul className="list-disc pl-5 space-y-1">
              {result.insights.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <p className="mt-4 text-blue-700 font-semibold cursor-pointer">
              🔓 Unlock full SEO support for all keywords →
            </p>
          </div>
        )}

        <p className="mt-6 text-xs text-center text-gray-500">
          No signup required · Free automated check
        </p>

      </div>
    </main>
  );
}
