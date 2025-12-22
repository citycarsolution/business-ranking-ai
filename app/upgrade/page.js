"use client";
import { useRouter } from "next/navigation";

export default function Upgrade() {
  const router = useRouter();

  const choose = (plan) => {
    localStorage.setItem("br_plan", plan);
    router.push("/pay");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center">Choose Your Plan</h1>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

          <Plan title="Basic" price="₹999" onClick={() => choose("basic")} />
          <Plan title="Pro" price="₹1999" onClick={() => choose("pro")} />
          <Plan title="Agency" price="₹2999" onClick={() => choose("agency")} />

        </div>
      </div>
    </main>
  );
}

function Plan({ title, price, onClick }) {
  return (
    <div className="border rounded-lg p-5 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{price}</p>
      <button
        onClick={onClick}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Choose
      </button>
    </div>
  );
}
