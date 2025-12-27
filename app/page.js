"use client";

import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setResult(null);

    if (!url) {
      setError("Please enter website URL");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          keywords: keywords
            .split("\n")
            .map(k => k.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center mb-4">
          Free Business Ranking & SEO Checker
        </h1>

        <input
          type="text"
          placeholder="Enter website URL"
          className="w-full border p-3 mb-3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <textarea
          placeholder="Enter keywords (one per line)"
          className="w-full border p-3 mb-3"
          rows={4}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          onClick={handleAnalyze}
          className="w-full bg-black text-white py-3 rounded mt-3"
        >
          {loading ? "Analyzing..." : "Check Business Ranking"}
        </button>

        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              SEO Score: {result.score}
            </h2>

            <ul className="list-disc pl-5">
              {result.insights?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {result.aiMessage && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <strong>AI Suggestion:</strong>
                <p>{result.aiMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
