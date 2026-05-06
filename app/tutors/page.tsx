import Link from "next/link";
import { tutors } from "@/data/tutors";

export default function TutorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        👨‍🏫 Our Tutors
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-xl font-bold">
                {tutor.name[0]}
              </div>

              <h2 className="text-xl font-bold mt-3">
                {tutor.name}
              </h2>

              <p className="text-gray-500">
                {tutor.subject}
              </p>
            </div>

            <div className="text-center mb-4">
              <p className="text-gray-700 font-semibold">
                {tutor.price} EGP / hour
              </p>
            </div>

            <Link
              href={`/book/${tutor.id}`}
              className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Book Now
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
}