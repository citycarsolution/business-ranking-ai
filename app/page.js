"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // URL validation
  const isValidURL = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const isBlocked = (url) =>
    url.includes("localhost") ||
    url.includes("127.0.0.1") ||
    url.includes("192.168");

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    if (!url) return setError("❌ Please enter a website URL");
    if (!isValidURL(url))
      return setError("❌ Enter a valid URL (https://example.com)");
    if (isBlocked(url))
      return setError("❌ Local or private URLs are not allowed");

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          keywords: keywords
            .split("\n")
            .map(k => k.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Analysis failed");

      setResult(data);
    } catch (err) {
      setError("⚠️ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070b1a] text-white flex justify-center px-4 py-16">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
          AI Business SEO Checker 🚀
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Enter your website & get instant SEO insights powered by AI
        </p>

        {/* Input Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">

          <input
            type="text"
            placeholder="https://yourwebsite.com"
            className="w-full p-3 rounded bg-black/40 border border-gray-700 mb-3"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <textarea
            rows={4}
            placeholder="Enter keywords (one per line)"
            className="w-full p-3 rounded bg-black/40 border border-gray-700 mb-4"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-3 rounded font-semibold disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Check SEO Score"}
          </button>

          {error && (
            <p className="text-red-400 text-center mt-3">{error}</p>
          )}
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-8 bg-white text-black p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-3">
              SEO Score: {result.score}/100
            </h3>

            <ul className="list-disc ml-5 text-gray-700">
              {result.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>

            {result.aiMessage && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <strong>🤖 AI Recommendation:</strong>
                <p className="mt-1">{result.aiMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
