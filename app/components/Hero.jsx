"use client";

import { useState } from "react";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showPro, setShowPro] = useState(false);

  const runAnalysis = async () => {
    if (!url) return;

    setLoading(true);
    setShowPro(false);
    setMessages([
      { type: "ai", text: "🔍 Analyzing your website… please wait" }
    ]);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      // Build AI-style chat from structured backend response
      const newMessages = [];

      if (data.business?.type) {
        newMessages.push(`🏢 Business Type: ${data.business.type}`);
      }

      if (data.business?.location) {
        newMessages.push(`📍 Location: ${data.business.location}`);
      }

      if (data.seoScore?.overall !== undefined) {
        newMessages.push(`📊 SEO Score: ${data.seoScore.overall}/100`);
      }

      if (data.topKeywords?.length) {
        newMessages.push(
          `🔑 Top Keywords:\n- ${data.topKeywords.join("\n- ")}`
        );
      }

      if (data.issues?.length) {
        newMessages.push(
          `⚠️ Issues Found:\n- ${data.issues.join("\n- ")}`
        );
      }

      if (data.missedTraffic?.monthlyRevenueLoss !== undefined) {
        newMessages.push(
          `💸 Estimated Monthly Revenue Loss: ₹${data.missedTraffic.monthlyRevenueLoss}`
        );
      }

      setMessages(newMessages.map(text => ({ type: "ai", text })));
      setShowPro(data.showPro === true);

    } catch (err) {
      setMessages([
        {
          type: "ai",
          text: "⚠️ " + (err.message || "Something went wrong")
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pt-20 pb-24 text-center">

      {/* HERO TEXT */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        AI SEO Consultant for{" "}
        <span className="text-cyan-400">Indian Businesses</span>
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto mb-10">
        Analyze your business, keywords and SEO exactly the way Google sees it.
      </p>

      {/* AI CHAT AREA */}
      <div className="max-w-3xl mx-auto space-y-4 text-left mb-10">
        {messages.map((m, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <p className="text-xs text-cyan-400 mb-1">🤖 AI Consultant</p>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {m.text}
            </p>
          </div>
        ))}
      </div>

      {/* PRO CARD */}
      {showPro && (
        <div className="max-w-3xl mx-auto mb-10 rounded-xl p-6 bg-gradient-to-r from-orange-500 to-red-600 text-left">
          <h3 className="text-xl font-semibold mb-2">
            🚀 PRO Plan Recommended
          </h3>

          <p className="text-sm mb-4 opacity-90">
            Unlock detailed fixes, full keyword list, and advanced optimization
            insights to grow faster.
          </p>

          <button className="w-full bg-black py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Grow Faster with PRO
          </button>
        </div>
      )}

      {/* INPUT BOX */}
      <div className="max-w-xl mx-auto bg-white/10 border border-white/10 rounded-xl p-6">
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="w-full p-3 mb-4 rounded bg-black/40 border border-gray-700 outline-none text-sm"
        />

        <button
          onClick={runAnalysis}
          disabled={loading}
          className="w-full py-3 rounded bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold disabled:opacity-60"
        >
          {loading ? "AI is analyzing…" : "Run Free AI SEO Analysis"}
        </button>

        <p className="text-xs text-gray-400 mt-3">
          Free analysis · No login required · PRO only if needed
        </p>
      </div>
    </section>
  );
}
