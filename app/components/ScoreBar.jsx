export default function ScoreBar({ label, score = 0, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{score}/100</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded">
        <div
          className={`h-2 rounded ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
