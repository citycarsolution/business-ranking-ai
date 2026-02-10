"use client";
import { useState } from "react";
import AutoSEO from "./auto-seo";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [business, setBusiness] = useState(null);
  const [keywords, setKeywords] = useState([]);

  const [loadingAnalyze, setLoadingAnalyze] = useState(false);
  const [loadingKeywords, setLoadingKeywords] = useState(false);

  const [errorAnalyze, setErrorAnalyze] = useState("");
  const [errorKeywords, setErrorKeywords] = useState("");

  const plan = "pro"; // future me payment se ayega

  // ================= STEP 1 =================
  const analyzeWebsite = async () => {
    if (!url) return;

    setLoadingAnalyze(true);
    setErrorAnalyze("");
    setErrorKeywords("");
    setBusiness(null);
    setKeywords([]);

    try {
      const res = await fetch("/api/ai/business-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.business_type) {
        throw new Error("Business detect failed");
      }

      setBusiness({
        website_type: data.website_type,
        business_type: data.business_type,
        services: Array.isArray(data.services) ? data.services : [],
      });
    } catch (err) {
      setErrorAnalyze("Business detection failed");
    } finally {
      setLoadingAnalyze(false);
    }
  };

  // ================= STEP 3 FIXED =================
  const generateKeywords = async () => {
    if (!business) return;

    setLoadingKeywords(true);
    setErrorKeywords("");

    try {
      const res = await fetch("/api/ai/keyword-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business }),
      });

      const data = await res.json();

      // ✅ FIX: data.ok check added
      if (!res.ok || data.ok !== true || !Array.isArray(data.keywords)) {
        throw new Error(data.error || "Keyword generation failed");
      }

      setKeywords(data.keywords);
    } catch (err) {
      console.error(err);
      setErrorKeywords("Keyword generation failed (AI side)");
    } finally {
      setLoadingKeywords(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🚀 Auto-SEO Dashboard</h1>

        {/* STEP 1 */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Step 1: AI Business Detection
          </h2>

          <input
            className="w-full p-3 rounded bg-black border border-white/20 mb-4"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={analyzeWebsite}
            disabled={loadingAnalyze}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded font-semibold"
          >
            {loadingAnalyze ? "Analyzing..." : "Analyze Website"}
          </button>

          {errorAnalyze && (
            <p className="text-red-400 mt-3 text-sm">{errorAnalyze}</p>
          )}
        </div>

        {/* STEP 2 */}
        {business && (
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">
              Step 2: Business Summary
            </h2>

            <p><b>Type:</b> {business.website_type}</p>
            <p><b>Business:</b> {business.business_type}</p>
            <p><b>Services:</b> {business.services.join(", ")}</p>

            <button
              onClick={generateKeywords}
              disabled={loadingKeywords}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
            >
              {loadingKeywords ? "Generating..." : "Generate Keywords"}
            </button>

            {errorKeywords && (
              <p className="text-red-400 mt-3 text-sm">{errorKeywords}</p>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {keywords.length > 0 && (
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Step 3: AI-Generated Keywords
            </h2>

            <ul className="list-disc list-inside space-y-1 text-sm">
              {keywords.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
        )}

        {/* STEP 4 */}
        {keywords.length > 0 && (
          <AutoSEO business={business} keywords={keywords} plan={plan} />
        )}
      </div>
    </div>
  );
}
