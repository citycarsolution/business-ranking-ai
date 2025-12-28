"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 TEMP ADMIN CHECK (later replace with auth)
  const isAdmin = true;

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
      return;
    }

    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {loading && (
          <p className="text-center text-gray-500">
            Loading users...
          </p>
        )}

        {!loading && (
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
                  <td className={`border px-3 py-2 font-semibold ${
                    u.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}>
                    {u.status}
                  </td>
                  <td className="border px-3 py-2">{u.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </main>
  );
}
