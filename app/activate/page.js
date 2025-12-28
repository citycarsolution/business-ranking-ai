"use client";
import { useEffect, useState } from "react";

export default function Activate() {
  const [email, setEmail] = useState("");
  const [txnId, setTxnId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const e = localStorage.getItem("br_email");
    if (e) setEmail(e);
  }, []);

  const submit = async () => {
    if (!txnId || txnId.length < 6) {
      setStatus({ type: "error", msg: "Enter valid transaction ID" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, txnId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", msg: data.error || "Verification failed" });
      } else {
        setStatus({ type: "success", msg: "Payment received. Verification in progress." });
      }
    } catch {
      setStatus({ type: "error", msg: "Network error. Try again." });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-xl font-bold text-center">Activate Your SEO Plan</h1>

        <input
          value={txnId}
          onChange={(e) => setTxnId(e.target.value)}
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
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg mt-5 font-semibold disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Submit for Verification"}
        </button>

        {status && (
          <p
            className={`mt-4 text-center ${
              status.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {status.msg}
          </p>
        )}
      </div>
    </main>
  );
}
