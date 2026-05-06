export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-4xl font-bold text-red-600 mb-4">
          ❌ Payment Cancelled
        </h1>

        <p className="text-gray-500">
          You cancelled the payment process
        </p>

      </div>
    </div>
  );
}