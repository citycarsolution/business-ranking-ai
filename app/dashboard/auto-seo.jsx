"use client";

export default function AutoSEO({
  business,
  keywords = [],
  plan = "FREE",
  seoData = null
}) {
  if (!keywords.length) return null;

  const primary = keywords.slice(0, 3);
  const secondary = keywords.slice(3, 8);

  const aiTasks =
    seoData?.completed || [
      "Meta title & description optimization",
      "Keyword mapping to service pages",
      "Heading structure planning (H1–H3)",
      "Internal linking suggestions",
      "Local SEO landing structure",
      "Content improvement recommendations",
    ];

  const developerTasks =
    seoData?.developer_required || [
      "Schema Markup (JSON-LD)",
      "Core Web Vitals optimization",
      "Image alt tags & compression",
      "Internal linking implementation",
      "Advanced technical fixes",
    ];

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold mb-2">
        🤖 Auto-SEO Optimization
      </h2>

      <p className="text-sm text-gray-300 mb-4">
        AI is optimizing your website using detected business & keywords
      </p>

      {/* PROGRESS */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>SEO Progress</span>
          <span className="text-green-400">80% Completed</span>
        </div>
        <div className="w-full bg-white/10 rounded h-2">
          <div className="bg-green-500 h-2 rounded w-[80%]" />
        </div>
      </div>

      {/* KEYWORDS */}
      <div className="mb-6 text-sm">
        <p>
          <b>Primary Keywords:</b> {primary.join(", ")}
        </p>
        <p className="mt-1">
          <b>Secondary Keywords:</b> {secondary.join(", ")}
        </p>
      </div>

      {/* AI DONE */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-green-400">
          ✅ AI Completed (80%)
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {aiTasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>
      </div>

      {/* DEV HANDOFF */}
      <div className="p-4 bg-black/60 border border-red-500/40 rounded">
        <h3 className="font-semibold text-red-400 mb-2">
          ⚠️ Developer Required (20%)
        </h3>

        <ul className="list-disc list-inside text-sm mb-4">
          {developerTasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>

        {plan === "PRO" || plan === "PREMIUM" ? (
          <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded font-semibold">
            Request Developer Fix (₹2999)
          </button>
        ) : (
          <p className="text-sm text-yellow-400">
            Upgrade to Pro to unlock developer fixes
          </p>
        )}
      </div>
    </div>
  );
}
