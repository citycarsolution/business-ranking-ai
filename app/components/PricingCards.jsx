export default function PricingCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-20">

      {/* FREE */}
      <div className="bg-cyan-500/10 border border-cyan-400/40 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3">Free</h3>
        <ul className="space-y-2 text-gray-300">
          <li>✔ Overall SEO Score</li>
          <li>✔ Technical SEO</li>
          <li className="text-red-400">✖ Content & Keyword SEO</li>
          <li className="text-red-400">✖ Auto Fix</li>
        </ul>
        <p className="mt-4 text-xs text-gray-400">
          “See what’s wrong. AI will not fix it yet.”
        </p>
      </div>

      {/* PAID */}
      <div className="bg-pink-500/10 border border-pink-400/40 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3">Pro / Advance</h3>
        <ul className="space-y-2 text-gray-300">
          <li>✔ Full SEO Breakdown</li>
          <li>✔ Content + Keyword SEO</li>
          <li>✔ AI Auto-Fix (80%)</li>
          <li>✔ Chat + Call Support</li>
        </ul>
        <button className="mt-4 w-full py-2 rounded bg-gradient-to-r from-pink-500 to-purple-500">
          Upgrade Now
        </button>
      </div>

    </div>
  );
}
