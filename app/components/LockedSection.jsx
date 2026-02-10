import { isLocked } from "@/app/lib/plans";

export default function LockedSection({ section, children }) {
  const locked = isLocked(section);

  if (!locked) return children;

  return (
    <div className="relative mt-4">
      <div className="blur-sm pointer-events-none opacity-60">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button className="px-4 py-2 bg-pink-500 rounded-lg text-white text-sm shadow-lg">
          🔒 Upgrade to Pro
        </button>
      </div>
    </div>
  );
}
