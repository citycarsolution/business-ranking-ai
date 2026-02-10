"use client";

import { useState } from "react";
import ScoreBar from "@/app/components/ScoreBar";
import LockedSection from "@/app/components/LockedSection";
import PricingSection from "@/app/components/PricingSection";


export default function HomePage() {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!url) {
      setError("URL is required");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, keywords }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed");
      } else {
        setResult(data);
      }
    } catch (e) {
      setError("Server not responding");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050817] text-white flex justify-center pt-10">
      <div className="w-[95%] max-w-6xl rounded-2xl bg-gradient-to-b from-[#0b0f25] to-[#050817] border border-white/10 shadow-[0_0_60px_#3b82f640] p-6">

        {/* NAVBAR */}
        <div className="flex justify-between items-center mb-14 backdrop-blur bg-black/20 rounded-xl px-4 py-3 sticky top-4 z-50">
          <div className="font-semibold flex items-center gap-2">
            ⚡ Business Ranking AI
          </div>
          <button className="border border-cyan-400 text-cyan-400 px-4 py-1 rounded hover:bg-cyan-400 hover:text-black transition">
            Login / Sign Up
          </button>
        </div>

        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Unlock Your Business Potential
          </h1>
          <p className="text-gray-400">
            AI-powered SEO insights to dominate search results
          </p>
        </div>

        {/* SEO FORM */}
        <div className="mx-auto max-w-xl bg-white/10 backdrop-blur border border-white/10 rounded-xl p-6 shadow hover:shadow-cyan-500/30 transition">

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Your Business URL"
            className="w-full p-3 mb-3 rounded bg-black/40 border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter Keywords"
            className="w-full p-3 mb-4 rounded bg-black/40 border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 rounded bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold hover:scale-[1.02] transition"
          >
            {loading ? "Analyzing..." : "Check Business Ranking"}
          </button>

          {error && (
            <p className="text-red-400 text-sm mt-3">{error}</p>
          )}
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-10 bg-black/40 p-6 rounded-xl border border-white/10">
            <ScoreBar
              label="Overall SEO"
              score={result.scores.overall}
              color="bg-green-500"
            />

            <LockedSection section="content">
              <ScoreBar
                label="Content SEO"
                score={result.scores.content}
                color="bg-purple-500"
              />
            </LockedSection>

            <LockedSection section="keyword">
              <ScoreBar
                label="Keyword SEO"
                score={result.scores.keyword}
                color="bg-yellow-500"
              />
            </LockedSection>
          </div>
        )}

        {/* ✅ PRICING SECTION (FINAL ADD) */}
        <PricingSection />

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-16">
          Powered by wepaapseostudio © 2026
        </p>

      </div>
    </main>
  );
}
