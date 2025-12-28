"use client";

import Link from "next/link";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 999,
    description: "For quick SEO checks",
    features: [
      "10 Keywords",
      "Basic SEO audit",
      "Website health check",
      "No manual support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 1999,
    highlight: true,
    description: "Best for growing businesses",
    features: [
      "30 Keywords",
      "Full SEO audit",
      "AI fix suggestions",
      "Priority support",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 2999,
    description: "For agencies & brands",
    features: [
      "Unlimited keywords",
      "Competitor analysis",
      "SEO roadmap",
      "WhatsApp support",
    ],
  },
];

export default function UpgradePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 flex justify-center">
      <div className="max-w-5xl w-full">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Upgrade Your SEO Power 🚀
          </h1>
          <p className="text-gray-600">
            Choose a plan that fits your business growth.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 ${
                plan.highlight
                  ? "border-black bg-gray-50 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">
                {plan.name}
              </h2>

              <p className="text-gray-500 mb-4">
                {plan.description}
              </p>

              <p className="text-3xl font-bold mb-4">
                ₹{plan.price}
              </p>

              <ul className="space-y-2 mb-6 text-sm">
                {plan.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              <Link
                href={`/pay?plan=${plan.id}`}
                className={`block text-center py-3 rounded-lg font-semibold ${
                  plan.highlight
                    ? "bg-black text-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                Choose Plan
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Line */}
        <p className="text-center text-xs text-gray-500 mt-10">
          100% secure · No auto billing · Cancel anytime
        </p>
      </div>
    </main>
  );
}
