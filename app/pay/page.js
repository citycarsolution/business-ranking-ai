export default function Pay() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">

        <h1 className="text-2xl font-bold">
          Complete Payment
        </h1>

        <p className="mt-2 text-gray-600">
          Scan & pay using any UPI app
        </p>

        <div className="mt-6 border rounded-xl p-4">
          <img
            src="/upi-qr.jpg"
            alt="UPI QR"
            className="mx-auto w-48"
          />
          <p className="mt-2 text-sm text-gray-700">
            UPI ID: <b>anshs3504@oksbi</b>
          </p>
        </div>

        <a
          href="/activate"
          className="block mt-6 bg-black text-white py-3 rounded-lg font-semibold"
        >
          I Have Paid
        </a>

        <p className="mt-4 text-xs text-gray-500">
          Payment verification may take a few minutes
        </p>

      </div>
    </main>
  );
}
