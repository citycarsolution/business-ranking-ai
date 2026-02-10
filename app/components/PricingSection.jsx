"use client";

export default function PricingSection() {
  return (
    <section className="mt-24">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3">
          Simple & Transparent Pricing
        </h2>
        <p className="text-gray-400">
          Start free. Upgrade when you see real results.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* FREE PLAN */}
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:scale-[1.02] transition">
          <h3 className="text-2xl font-semibold mb-2">Free</h3>
          <p className="text-gray-400 mb-4">₹0 / month</p>

          <ul className="text-gray-300 space-y-2 mb-6">
            <li>✔ Website SEO Scan</li>
            <li>✔ SEO Score</li>
            <li>✔ Basic Issues</li>
            <li>❌ AI Auto Fix</li>
            <li>❌ Human Support</li>
          </ul>

          <button className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
            Try Free
          </button>
        </div>

        {/* PRO PLAN */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400 shadow-lg scale-105">
          <h3 className="text-2xl font-semibold mb-2">Pro</h3>
          <p className="text-gray-200 mb-4">₹999 / month</p>

          <ul className="text-gray-200 space-y-2 mb-6">
            <li>✔ AI SEO Auto Fix (80%)</li>
            <li>✔ Content Generator</li>
            <li>✔ Keyword Optimization</li>
            <li>✔ Limited AI + Dev Support</li>
          </ul>

          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition">
            Upgrade to Pro
          </button>
        </div>

        {/* PREMIUM PLAN */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-400 hover:scale-[1.02] transition">
          <h3 className="text-2xl font-semibold mb-2">Premium</h3>
          <p className="text-gray-200 mb-4">Custom Pricing</p>

          <ul className="text-gray-200 space-y-2 mb-6">
            <li>✔ Dedicated SEO Developer</li>
            <li>✔ Custom SEO Strategy</li>
            <li>✔ Full AI + Human Control</li>
            <li>✔ WhatsApp / Call Support</li>
          </ul>

          <button
            onClick={() => window.open("https://wa.me/919082552031")}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition"
          >
            Contact Expert
          </button>
        </div>

      </div>
    </section>
  );
}
