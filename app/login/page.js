"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const submit = () => {
    if (!email || !email.includes("@")) {
      alert("Valid email required");
      return;
    }
    localStorage.setItem("br_email", email);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center">Continue with Email</h1>
        <p className="mt-2 text-center text-gray-600">
          Use the same email you used for payment
        </p>

        <input
          className="w-full border px-4 py-3 rounded-lg mt-6"
          placeholder="you@business.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-black text-white py-3 rounded-lg mt-5 font-semibold"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
