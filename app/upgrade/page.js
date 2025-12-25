"use client";

export default function UpgradePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Upgrade to Pro SEO Support
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Unlock full SEO power, detailed insights, and expert-level fixes.
        </p>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* BASIC */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Starter</h2>
            <p className="text-gray-500 mb-4">For quick checks</p>
            <p className="text-3xl font-bold mb-4">₹999</p>

            <ul className="text-sm space-y-2 mb-6">
              <li>✔ 10 Keywords</li>
              <li>✔ Basic SEO issues</li>
              <li>✔ Website audit</li>
              <li>✖ No manual support</li>
            </ul>

            <a
              href="/pay?plan=starter"
              className="block text-center bg-black text-white py-2 rounded-lg"
            >
              Choose Plan
            </a>
          </div>

          {/* PRO */}
          <div className="border-2 border-black rounded-xl p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Pro (Recommended)</h2>
            <p className="text-gray-500 mb-4">Best for business growth</p>
            <p className="text-3xl font-bold mb-4">₹1999</p>

            <ul className="text-sm space-y-2 mb-6">
              <li>✔ 30 Keywords</li>
              <li>✔ Full SEO audit</li>
              <li>✔ Fix suggestions</li>
              <li>✔ Priority support</li>
            </ul>

            <a
              href="/pay?plan=pro"
              className="block text-center bg-black text-white py-2 rounded-lg"
            >
              Upgrade Now
            </a>
          </div>

          {/* ENTERPRISE */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Business</h2>
            <p className="text-gray-500 mb-4">For agencies & brands</p>
            <p className="text-3xl font-bold mb-4">₹2999</p>

            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Unlimited keywords</li>
              <li>✔ Competitor analysis</li>
              <li>✔ SEO roadmap</li>
              <li>✔ WhatsApp support</li>
            </ul>

            <a
              href="/pay?plan=business"
              className="block text-center bg-black text-white py-2 rounded-lg"
            >
              Start Now
            </a>
          </div>
        </div>

        {/* TRUST LINE */}
        <p className="text-center text-xs text-gray-500 mt-10">
          100% safe · No auto-billing · Cancel anytime
        </p>
      </div>
    </main>
  );
}
