"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fake API simulation (replace later with real DB)
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          email: "user1@gmail.com",
          plan: "Pro",
          status: "Active",
          keywords: 25,
          city: "Mumbai",
          expiry: "2025-03-20",
        },
        {
          id: 2,
          email: "user2@gmail.com",
          plan: "Starter",
          status: "Expired",
          keywords: 8,
          city: "Delhi",
          expiry: "2025-02-01",
        },
        {
          id: 3,
          email: "client@business.com",
          plan: "Business",
          status: "Active",
          keywords: 50,
          city: "Bangalore",
          expiry: "2025-04-10",
        },
      ]);
    }, 500);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard – User Analytics
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Plan</th>
                <th className="border px-3 py-2">Keywords</th>
                <th className="border px-3 py-2">City</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Expiry</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="text-center">
                  <td className="border px-3 py-2">{u.email}</td>
                  <td className="border px-3 py-2">{u.plan}</td>
                  <td className="border px-3 py-2">{u.keywords}</td>
                  <td className="border px-3 py-2">{u.city}</td>
                  <td
                    className={`border px-3 py-2 font-semibold ${
                      u.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {u.status}
                  </td>
                  <td className="border px-3 py-2">{u.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Admin-only data. Auto-refresh coming soon.
        </p>
      </div>
    </main>
  );
}
