"use client";
import { useEffect, useState } from "react";

export default function Activate() {
  const [email, setEmail] = useState("");
  const [txnId, setTxnId] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const e = localStorage.getItem("br_email");
    if (e) setEmail(e);
  }, []);

  const submit = async () => {
    await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, txnId })
    });
    setDone(true);
  };

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <h1 className="text-2xl font-bold">Payment Received</h1>
          <p className="mt-2 text-gray-600">
            We’ll activate SEO after verification
          </p>
          <a href="/dashboard" className="block mt-4 text-blue-700">
            Go to Dashboard →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-xl font-bold text-center">
          Activate Your SEO Support
        </h1>

        <input
          value={txnId}
          onChange={e => setTxnId(e.target.value)}
          placeholder="Transaction ID"
          className="w-full border px-4 py-3 rounded-lg mt-4"
        />

        <input
          value={email}
          disabled
          className="w-full border px-4 py-3 rounded-lg mt-3 bg-gray-100"
        />

        <button
          onClick={submit}
          className="w-full bg-black text-white py-3 rounded-lg mt-5 font-semibold"
        >
          Submit for Verification
        </button>
      </div>
    </main>
  );
}
