export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow text-center">

        <h1 className="text-2xl font-bold text-green-600">
          🎉 Payment Successful!
        </h1>

        <p className="text-gray-600 mt-2">
          تم تأكيد الحجز بنجاح
        </p>

      </div>

    </div>
  );
}