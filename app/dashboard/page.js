"use client";

import { useState } from "react";
import { calculateScore, calculateRisk } from "@/app/lib/score";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const check = async () => {
    setError("");
    setData(null);

    if (!email) {
      setError("Email required");
      return;
    }

    const res = await fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const d = await res.json();
    setData(d);
  };

  const daysLeft =
    data?.expiresAt
      ? Math.ceil((data.expiresAt - Date.now()) / 86400000)
      : 0;

  const score = data?.actions ? calculateScore(data.actions.length) : 0;
  const risk = data?.actions ? calculateRisk(data.actions.length) : "";

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-1">SEO Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Monitor your business visibility & SEO health
      </p>

      <input
        className="border px-4 py-3 w-full rounded"
        placeholder="Enter your payment email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <button
        onClick={check}
        className="mt-4 bg-black text-white px-6 py-3 rounded"
      >
        Check Status
      </button>

      {data && data.status !== "active" && (
        <div className="mt-6 bg-red-100 border p-4 rounded">
          ❌ SEO support not active.
          <a href="/upgrade" className="ml-2 underline font-semibold">
            Upgrade now
          </a>
        </div>
      )}

      {data && data.status === "active" && (
        <div className="mt-8 space-y-6">

          <div className="border p-5 rounded bg-gray-50">
            <p><b>Status:</b> ACTIVE</p>
            <p><b>Days Left:</b> {daysLeft}</p>
            <p><b>SEO Score:</b> {score} / 100</p>
            <p><b>SEO Risk:</b> {risk}</p>
          </div>

          {daysLeft <= 7 && (
            <div className="bg-yellow-100 border p-4 rounded">
              ⚠️ SEO support expires in {daysLeft} days.
              <a href="/upgrade" className="ml-2 underline font-semibold">
                Renew now
              </a>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold mb-3">
              🔧 Action Plan
            </h2>

            {data.actions.map((a, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded mb-3">
                <p className="font-semibold">{i + 1}. {a.title}</p>
                <p className="text-sm text-gray-700">{a.detail}</p>
              </div>
            ))}
          </div>

        </div>
      )}

      <p className="mt-10 text-xs text-center text-gray-500">
        Manual review · No auto billing · Business-safe SEO
      </p>
    </main>
  );
}
