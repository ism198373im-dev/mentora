export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-blue-600">
          📖 Mentora
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Learn Quran, Math, and more with the best tutors online 🚀
        </p>

        <div className="mt-6">
          <a
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* ⭐ FEATURES */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Mentora?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="font-bold text-lg">📚 Expert Tutors</h3>
            <p className="text-gray-500 mt-2">
              Learn from experienced teachers
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="font-bold text-lg">⚡ Easy Booking</h3>
            <p className="text-gray-500 mt-2">
              Book sessions in seconds
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="font-bold text-lg">💳 Secure Payments</h3>
            <p className="text-gray-500 mt-2">
              Pay safely using Stripe
            </p>
          </div>

        </div>
      </section>

      {/* 💰 PRICING */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Pricing
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* FREE */}
          <div className="border p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold">Free</h3>
            <p className="text-gray-500 mt-2">
              Basic access
            </p>
            <p className="text-3xl font-bold mt-4">0 EGP</p>
          </div>

          {/* PRO */}
          <div className="border-2 border-blue-600 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold text-blue-600">Pro</h3>
            <p className="text-gray-500 mt-2">
              Unlimited bookings
            </p>
            <p className="text-3xl font-bold mt-4">99 EGP / month</p>

            <a
              href="/signup"
              className="block mt-4 bg-blue-600 text-white py-2 rounded"
            >
              Upgrade Now
            </a>
          </div>

        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold">
          Start Learning Today 🚀
        </h2>

        <a
          href="/signup"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded"
        >
          Create Account
        </a>
      </section>

    </div>
  );
}