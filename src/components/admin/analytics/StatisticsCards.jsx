function StatisticsCards({
  totalOrders,
  pendingOrders,
  processingOrders,
  deliveredOrders,
}) {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-8">

      <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold">
          📦 Total Orders
        </h3>

        <p className="text-4xl font-bold mt-3">
          {totalOrders}
        </p>
      </div>

      <div className="bg-yellow-500 text-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold">
          ⏳ Pending
        </h3>

        <p className="text-4xl font-bold mt-3">
          {pendingOrders}
        </p>
      </div>

      <div className="bg-purple-600 text-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold">
          🚚 Processing
        </h3>

        <p className="text-4xl font-bold mt-3">
          {processingOrders}
        </p>
      </div>

      <div className="bg-green-600 text-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold">
          ✅ Delivered
        </h3>

        <p className="text-4xl font-bold mt-3">
          {deliveredOrders}
        </p>
      </div>

    </div>
  );
}

export default StatisticsCards;