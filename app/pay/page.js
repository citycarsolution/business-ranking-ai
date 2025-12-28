"use client";

import { useState } from "react";

export default function Pay() {
  const [email, setEmail] = useState("");
  const [txn, setTxn] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!email || !email.includes("@")) {
      setMessage("❌ Please enter a valid email");
      return;
    }

    if (!txn || txn.length < 6) {
      setMessage("❌ Please enter a valid transaction ID");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, txnId: txn }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("✅ Payment submitted successfully. Activation in progress.");
        setEmail("");
        setTxn("");
      }
    } catch (err) {
      setMessage("❌ Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Complete Your Payment
        </h1>

        <img
          src="/upi-qr.jpg"
          alt="UPI QR"
          className="w-full rounded mb-4"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-3 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Transaction ID"
          className="w-full border p-3 rounded mb-4"
          value={txn}
          onChange={(e) => setTxn(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded font-semibold disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Payment"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
