"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <div className="text-lg font-semibold tracking-wide">
          ⚡ Business Ranking AI
        </div>

        {/* ACTION */}
        <button className="border border-cyan-400 text-cyan-400 px-4 py-1.5 rounded-md hover:bg-cyan-400 hover:text-black transition">
          Login / Sign Up
        </button>
      </div>
    </header>
  );
}
