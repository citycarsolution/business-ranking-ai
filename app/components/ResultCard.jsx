"use client";

export default function ResultCard({ data }) {
  const downloadPDF = async () => {
    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: data.url,
        score: data.score,
        issues: data.issues,
      }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "seo-report.pdf";
    a.click();
  };

  return (
    <div className="mt-6 bg-black/40 p-6 rounded-xl border border-white/10">

      {/* SCORE */}
      <h2 className="text-2xl font-bold mb-2 text-green-400">
        SEO Score: {data.score}/100
      </h2>

      {/* ISSUES */}
      <div className="mt-3">
        <h3 className="font-semibold mb-2 text-white">Issues Found:</h3>
        <ul className="list-disc pl-5 text-gray-300 space-y-1">
          {data.issues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      </div>

      {/* AI SUGGESTION */}
      {data.aiMessage && (
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-blue-400 mb-1">
            🤖 AI Recommendation
          </h3>
          <p className="text-gray-300">{data.aiMessage}</p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={downloadPDF}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Download PDF Report
        </button>

        <button
          onClick={() => window.location.reload()}
          className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white"
        >
          New Scan
        </button>
      </div>
    </div>
  );
}
