export default function Upgrade() {
  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Upgrade SEO Support</h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="border p-4 rounded">
          <h3>Starter</h3>
          <p className="text-xl">₹999</p>
        </div>

        <div className="border-2 border-black p-4 rounded">
          <h3>Growth</h3>
          <p className="text-xl">₹1999</p>
          <p className="text-xs">Most Popular</p>
        </div>

        <div className="border p-4 rounded">
          <h3>Authority</h3>
          <p className="text-xl">₹2999</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <a href="/pay" className="bg-black text-white px-6 py-3 rounded">
          Continue to Payment →
        </a>
      </div>
    </main>
  );
}
