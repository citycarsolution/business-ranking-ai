"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [status, setStatus] = useState("loading"); // loading | active | expired | inactive
  const [daysLeft, setDaysLeft] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Check login + fetch status
  useEffect(() => {
    const email = localStorage.getItem("br_email");
    if (!email) {
      router.push("/login");
      return;
    }

    fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "active") {
          setStatus("active");
          const days = Math.ceil(
            (data.expiresAt - Date.now()) / (1000 * 60 * 60 * 24)
          );
          setDaysLeft(days);
        } else {
          setStatus(data.status);
        }
      });
  }, [router]);

  // 🔁 Renew / Extend plan
  const renewPlan = async () => {
    const email = localStorage.getItem("br_email");
    if (!email) return;

    setLoading(true);

    const res = await fetch("/api/renew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.status === "renewed") {
      const days = Math.ceil(
        (data.expiresAt - Date.now()) / (1000 * 60 * 60 * 24)
      );
      setStatus("active");
      setDaysLeft(days);
      alert("✅ SEO support extended by 30 days");
    }

    setLoading(false);
  };

  // 🚪 Logout (optional utility)
  const logout = () => {
    localStorage.removeItem("br_email");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            SEO Status:{" "}
            {status === "active" ? (
              <span className="text-green-600">ACTIVE</span>
            ) : status === "expired" ? (
              <span className="text-red-600">EXPIRED</span>
            ) : (
              <span className="text-gray-500">INACTIVE</span>
            )}
          </h1>

          <button
            onClick={logout}
            className="text-sm text-gray-500 underline"
          >
            Logout
          </button>
        </div>

        {/* ACTIVE STATE */}
        {status === "active" && (
          <>
            <p className="mt-2 text-gray-600">
              SEO Support is active. Expires in{" "}
              <b>{daysLeft}</b> day{daysLeft === 1 ? "" : "s"}.
            </p>

            <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm">
              <p><b>Plan:</b> Pro</p>
              <p><b>Keywords:</b> Unlimited</p>
              <p><b>Support:</b> Active</p>
            </div>

            {/* 🔁 OPTIONAL EXTEND FOR ACTIVE USER */}
            <button
              onClick={renewPlan}
              disabled={loading}
              className="mt-6 bg-black text-white px-5 py-3 rounded-lg font-semibold"
            >
              {loading ? "Extending..." : "Extend Support by 30 Days"}
            </button>
          </>
        )}

        {/* EXPIRED STATE */}
        {status === "expired" && (
          <div className="mt-6">
            <p className="text-red-600">
              Your SEO support has expired.
            </p>

            <button
              onClick={renewPlan}
              disabled={loading}
              className="mt-4 bg-black text-white px-5 py-3 rounded-lg font-semibold"
            >
              {loading ? "Renewing..." : "Renew for 30 Days"}
            </button>
          </div>
        )}

        {/* INACTIVE / NO PAYMENT */}
        {status === "inactive" && (
          <div className="mt-6">
            <p className="text-gray-600">
              No active SEO support found.
            </p>
            <a
              href="/upgrade"
              className="inline-block mt-4 bg-black text-white px-5 py-3 rounded-lg font-semibold"
            >
              Upgrade Plan
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
