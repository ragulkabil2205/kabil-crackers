function RecentActivity({ recentOrders }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

      <h2 className="text-2xl font-bold mb-6">
        🕒 Recent Activity
      </h2>

      {recentOrders.length === 0 ? (
        <p className="text-gray-500">
          No Orders Found
        </p>
      ) : (
        <div className="space-y-4">

          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>

                <h3 className="font-semibold">
                  {order.customer}
                </h3>

                <p className="text-sm text-gray-500">
                  {order.orderDate}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  ₹ {Number(order.total || 0).toLocaleString()}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentActivity;