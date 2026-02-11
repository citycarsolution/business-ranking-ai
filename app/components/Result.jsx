export default function Result({ data, plan = "free" }) {
  if (!data) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 pb-20 mt-16">

      {/* BUSINESS INFO */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">
          🏢 Business Detected by AI
        </h2>

        <p><b>Type:</b> {data.business.type}</p>
        <p><b>Industry:</b> {data.business.industry}</p>
        <p className="mt-2">
          <b>Services:</b> {data.business.services.join(", ")}
        </p>
      </div>

      {/* KEYWORDS */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          🔑 Business Keywords
        </h2>

        <div className="flex flex-wrap gap-2">
          {data.keywords.map((k, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
            >
              {k.keyword}
            </span>
          ))}
        </div>
      </div>

      {/* SCORES */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          📊 SEO Scores
        </h2>

        <p>Overall SEO: <b>{data.scores.overall}/100</b></p>
        <p>Content SEO: <b>{data.scores.content}/100</b></p>
        <p>Technical SEO: <b>{data.scores.technical}/100</b></p>
        <p>Keyword SEO: <b>{data.scores.keyword}/100</b></p>
      </div>

      {/* ISSUES = PAIN */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          🚨 SEO Problems Affecting Your Rankings
        </h2>

        <div className="space-y-4">
          {data.issues.map((issue, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-lg p-4 bg-black/60"
            >
              <p className="font-semibold text-red-400">
                ❌ {issue.title}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {issue.impact}
              </p>

              {plan === "free" ? (
                <p className="text-yellow-400 text-sm mt-2">
                  🔒 Exact AI fix available in PRO
                </p>
              ) : (
                <p className="text-green-400 text-sm mt-2">
                  ✅ Fix: {issue.fix}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
