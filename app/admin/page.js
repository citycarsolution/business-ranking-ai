import { readDB, writeDB } from "@/app/lib/db";

export default function Admin() {
  const db = readDB();

  const verify = (index) => {
    const now = Date.now();
    db.payments[index].status = "active";
    db.payments[index].activatedAt = now;
    db.payments[index].expiresAt = now + 30 * 24 * 60 * 60 * 1000;
    writeDB(db);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin – Payments</h1>

      {db.payments.map((p, i) => (
        <div key={i} className="bg-white p-4 rounded-lg mb-4 shadow">
          <p><b>Email:</b> {p.email}</p>
          <p><b>Txn:</b> {p.txnId}</p>
          <p><b>Status:</b> {p.status}</p>

          {p.status === "pending" && (
            <form action={() => verify(i)}>
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
                Verify & Activate
              </button>
            </form>
          )}
        </div>
      ))}
    </main>
  );
}
