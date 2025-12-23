"use client";
import { useState } from "react";

export default function Pay() {
  const [email, setEmail] = useState("");
  const [txn, setTxn] = useState("");

  const submit = async () => {
    await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, txnId: txn })
    });
    alert("Payment submitted. Admin will activate.");
  };

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>

      <img src="/upi-qr.jpg" className="mb-4" />

      <input
        className="border px-3 py-2 w-full mb-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="border px-3 py-2 w-full mb-4"
        placeholder="Transaction ID"
        onChange={e => setTxn(e.target.value)}
      />

      <button onClick={submit} className="bg-black text-white px-4 py-2">
        Submit
      </button>
    </main>
  );
}
