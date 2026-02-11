"use client";

export default function AIChatFeed({ messages }) {
  if (!messages.length) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4 text-left">
      {messages.map((msg, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-xl p-4 animate-fade-in"
        >
          <p className="text-sm text-gray-400 mb-1">{msg.label}</p>
          <div className="text-white text-base leading-relaxed">
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
