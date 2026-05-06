import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex flex-col items-center justify-center text-center px-6 py-28">

        <h1 className="text-6xl font-bold text-blue-600 mb-6">
          📖 Mentora
        </h1>

        <p className="text-gray-600 text-xl max-w-2xl mb-8">
          Learn Quran, Math, and English with expert tutors. Book your session easily and start learning today 🚀
        </p>

        <div className="flex gap-4">

          <Link
            href="/tutors"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
          >
            Find Tutors
          </Link>

          <Link
            href="/bookings"
            className="bg-white border px-8 py-3 rounded-xl hover:bg-gray-100"
          >
            My Bookings
          </Link>

        </div>

      </div>

    </div>
  );
}