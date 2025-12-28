"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("br_email"),
          }),
        });

        const data = await res.json();

        if (data.status === "active") {
          setUser({
            email: localStorage.getItem("br_email"),
            expires: new Date(data.expiresAt).toLocaleDateString(),
            plan: "Pro",
          });
          setStatus("active");
        } else if (data.status === "expired") {
          setStatus("expired");
        } else {
          setStatus("inactive");
        }
      } catch (e) {
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">Plan Expired</h2>
          <p className="text-gray-600 mb-4">
            Your plan has expired. Please renew to continue using premium
            features.
          </p>
          <Link
            href="/activate"
            className="bg-black text-white px-5 py-2 rounded"
          >
            Renew Now
          </Link>
        </div>
      </div>
    );
  }

  if (status === "inactive") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">Account Inactive</h2>
          <p className="text-gray-600 mb-4">
            Your account is not activated yet.
          </p>
          <Link
            href="/activate"
            className="bg-black text-white px-5 py-2 rounded"
          >
            Activate Now
          </Link>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Something went wrong. Please try again.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          Welcome back 👋
        </h1>

        <p className="text-gray-600 mb-6">
          Logged in as <strong>{user.email}</strong>
        </p>

        <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6">
          <p className="font-semibold text-green-700">
            ✅ Plan Active: {user.plan}
          </p>
          <p className="text-sm text-green-700">
            Valid until: {user.expires}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card title="SEO Health">
            Your website has good on-page SEO. Improve backlinks for better results.
          </Card>

          <Card title="Keyword Ranking">
            12 keywords ranking between position 11–25. Push for top 10.
          </Card>

          <Card title="Content Suggestions">
            Add city pages and internal links for better indexing.
          </Card>

          <Card title="Backlink Status">
            Low authority backlinks detected. Outreach recommended.
          </Card>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg"
          >
            Run New SEO Scan →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Card({ title, children }) {
  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{children}</p>
    </div>
  );
}
