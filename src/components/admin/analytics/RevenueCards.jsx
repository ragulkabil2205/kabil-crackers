function RevenueCards({
  todayRevenue,
  weeklyRevenue,
  monthlyRevenue,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Today's Revenue
        </h3>

        <p className="text-3xl font-bold text-green-600 mt-3">
          ₹ {todayRevenue.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Weekly Revenue
        </h3>

        <p className="text-3xl font-bold text-blue-600 mt-3">
          ₹ {weeklyRevenue.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Monthly Revenue
        </h3>

        <p className="text-3xl font-bold text-purple-600 mt-3">
          ₹ {monthlyRevenue.toLocaleString()}
        </p>
      </div>

    </div>
  );
}

export default RevenueCards;