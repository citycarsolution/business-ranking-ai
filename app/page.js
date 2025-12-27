"use client";
import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    const keywordList = keywords
      .split("\n")
      .map(k => k.trim())
      .filter(Boolean);

    if (!url) return setError("Website URL required");
    if (keywordList.length === 0) return setError("Enter at least 1 keyword");

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          keywords: keywordList
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center">
          Free Business Ranking & SEO Checker
        </h1>

        <input
          className="w-full border p-3 mt-4"
          placeholder="Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <textarea
          className="w-full border p-3 mt-3"
          rows="4"
          placeholder="Enter keywords (one per line)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-black text-white py-3 rounded"
        >
          {loading ? "Analyzing..." : "Check Business Ranking"}
        </button>

        {result && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">SEO Insights</h3>
            <ul className="list-disc pl-5">
              {result.insights.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
