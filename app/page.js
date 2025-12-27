"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        keywords: keywords.split("\n"),
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Free Business Ranking & SEO Checker
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        rows={4}
        placeholder="Keywords (one per line)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Checking..." : "Check Business Ranking"}
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="font-bold">SEO Score: {result.score}</h3>

          <ul className="list-disc ml-6 mt-2">
            {result.issues.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          {result.aiMessage && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <strong>AI Suggestion:</strong>
              <p>{result.aiMessage}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
