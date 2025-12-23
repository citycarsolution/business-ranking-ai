"use client";
import { useEffect, useState } from "react";

export default function Admin() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/api/admin").then(r => r.json()).then(setList);
  }, []);

  const approve = async (email) => {
    await fetch("/api/renew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    location.reload();
  };

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>

      {list.map((p, i) => (
        <div key={i} className="border p-3 mb-2">
          {p.email} — {p.status}
          {p.status === "pending" && (
            <button onClick={() => approve(p.email)} className="ml-4">
              Approve
            </button>
          )}
        </div>
      ))}
    </main>
  );
}
