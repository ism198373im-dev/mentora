import Link from "next/link";

export default function TutorsPage() {
  const tutors = [
    {
      id: 1,
      name: "Ahmed Ali",
      subject: "Quran Teacher",
      rating: 4.9,
      price: 50,
      top: true,
    },
    {
      id: 2,
      name: "Sara Mohamed",
      subject: "Math Teacher",
      rating: 4.8,
      price: 70,
      top: false,
    },
    {
      id: 3,
      name: "Omar Hassan",
      subject: "English Teacher",
      rating: 4.7,
      price: 60,
      top: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="text-center py-16 bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
          Our Expert Tutors
        </h1>

        <p className="text-gray-600 text-lg">
          Learn from verified and experienced teachers 🚀
        </p>
      </section>

      {/* TUTORS GRID */}
      <section className="px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-3xl shadow-lg p-8 border hover:shadow-2xl hover:-translate-y-2 transition duration-300 relative"
            >

              {/* TOP BADGE */}
              {tutor.top && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                  ⭐ Top Rated
                </div>
              )}

              <div className="text-5xl mb-4">👨‍🏫</div>

              <h2 className="text-2xl font-bold text-blue-900 mb-1">
                {tutor.name}
              </h2>

              <p className="text-gray-500 mb-3">
                {tutor.subject}
              </p>

              <div className="flex justify-between items-center mb-4">
                <p className="text-yellow-600 font-bold">
                  ⭐ {tutor.rating}
                </p>

                <p className="text-gray-800 font-semibold">
                  {tutor.price} EGP / hr
                </p>
              </div>

              {/* BOOK BUTTON */}
              <Link href={`/book/${tutor.id}`}>
                <button className="w-full bg-blue-900 text-white py-3 rounded-2xl font-bold hover:bg-blue-800 transition">
                  Book Now
                </button>
              </Link>

            </div>
          ))}

        </div>
      </section>

    </main>
  );
}