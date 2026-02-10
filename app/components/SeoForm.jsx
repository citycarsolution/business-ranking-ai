"use client";

import { useState } from "react";
import ResultCard from "./ResultCard";

export default function SeoForm() {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        keywords: keywords.split(",").map(k => k.trim())
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="max-w-xl w-full bg-white/5 p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">AI SEO Analyzer</h1>

      <input
        className="w-full p-2 mb-3 bg-black/40 rounded"
        placeholder="Website URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />

      <textarea
        className="w-full p-2 mb-3 bg-black/40 rounded"
        placeholder="Keywords (comma separated)"
        onChange={e => setKeywords(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 px-4 py-2 rounded w-full"
      >
        Analyze
      </button>

      {loading && <p className="mt-3">Analyzing...</p>}

      {result && <ResultCard data={result} />}
    </div>
  );
}
