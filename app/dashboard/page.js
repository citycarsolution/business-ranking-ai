"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fake fetch (replace later with real API)
    setTimeout(() => {
      setUser({
        email: "user@example.com",
        plan: "pro",
        expires: "2025-02-20",
      });
      setStatus("active");
    }, 800);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">
          SEO Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome back, <span className="font-semibold">{user.email}</span>
        </p>

        {/* STATUS */}
        <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6">
          <p className="font-semibold text-green-700">
            ✅ Plan Active: {user.plan.toUpperCase()}
          </p>
          <p className="text-sm text-green-700">
            Valid till: {user.expires}
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-5">
            <h3 className="font-semibold mb-2">SEO Health</h3>
            <p className="text-gray-600 text-sm">
              Your website has good on-page SEO but needs better keyword focus.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Keyword Ranking</h3>
            <p className="text-gray-600 text-sm">
              12 keywords ranking on page 2–3. Push needed to reach top 10.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Content Suggestions</h3>
            <p className="text-gray-600 text-sm">
              Add 2 city pages and improve internal linking.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-semibold mb-2">Backlink Status</h3>
            <p className="text-gray-600 text-sm">
              Low authority backlinks detected. Guest post recommended.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/upgrade"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>
    </main>
  );
}
