import { useState } from "react";
import { useOrders } from "../context/OrdersContext";

function TrackOrder() {
    const [userOrders, setUserOrders] = useState([]);
const [foundOrder, setFoundOrder] = useState(null);
  const { orders } = useOrders();

  const [phone, setPhone] = useState("");
  


const handleSearch = () => {
  const filtered = orders.filter(
    (o) => o.phone === phone.trim()
  );

  if (filtered.length > 0) {
    setUserOrders(filtered);
    setFoundOrder(null);
  } else {
    setUserOrders([]);
    setFoundOrder(false);
  }
};
  const statusColor = (status) => {
    switch (status) {
      case "Pending Verification":
        return "bg-yellow-100 text-yellow-700";
      case "Payment Verified":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Out For Delivery":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStep = (status) => {
    switch (status) {
      case "Pending Verification":
        return 1;
      case "Payment Verified":
        return 2;
      case "Processing":
        return 3;
      case "Out For Delivery":
        return 4;
      case "Delivered":
        return 5;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          📦 Track Your Order
        </h1>

        <input
          type="text"
          placeholder="Enter your registered mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
        />


        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold"
        >
          Track Order
        </button>

        {userOrders.length > 0 && (
  <div className="mt-8">

    <h2 className="text-2xl font-bold mb-5">
      📦 Your Orders
    </h2>

    {userOrders.map((order) => (
      <div
        key={order.id}
        className="border rounded-xl p-5 bg-gray-50 mb-4"
      >
        <p className="font-bold">
          Order #{order.id}
        </p>

        <p>₹ {order.total}</p>

        <p className="mt-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold ${statusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </p>

        <button
          onClick={() => setFoundOrder(order)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Track
        </button>
      </div>
    ))}

  </div>
)}

        {/* Order Found */}
        {foundOrder && (
          <>
            <div className="mt-8 border rounded-2xl p-6 bg-gray-50">

              <h2 className="text-2xl font-bold mb-5">
                ✅ Order Found
              </h2>

              <p>
                <strong>Order ID:</strong> #{foundOrder.id}
              </p>

              <p>
                <strong>Customer:</strong> {foundOrder.customer}
              </p>

              <p>
                <strong>Phone:</strong> {foundOrder.phone}
              </p>

              <p>
                <strong>Delivery Date:</strong>{" "}
                {foundOrder.deliveryDate}
              </p>

              <div className="mt-5 border rounded-xl p-4 bg-white">

  <h3 className="font-bold text-lg mb-3">
    🧾 Bill Summary
  </h3>

  <div className="flex justify-between py-1">
    <span>Items Total</span>
    <span>₹ {Number(foundOrder.subtotal).toLocaleString()}</span>
  </div>

  <div className="flex justify-between py-1">
    <span>GST (8%)</span>
    <span>₹ {Math.round(foundOrder.gst)}</span>
  </div>

  <div className="flex justify-between py-1">
    <span>Packing Charges (3%)</span>
    <span>₹ {Math.round(foundOrder.packing)}</span>
  </div>

  <div className="flex justify-between py-1">
    <span>Shipment Charges</span>
    <span>₹ {foundOrder.shipment}</span>
  </div>

  <hr className="my-3" />

  <div className="flex justify-between font-bold text-lg text-green-700">
    <span>Grand Total</span>
    <span>₹ {Math.round(foundOrder.total).toLocaleString()}</span>
  </div>

</div>
<div className="mt-5">

  <p className="font-semibold mb-2">
    Payment Status
  </p>

  <span
    className={`px-4 py-2 rounded-full font-bold ${
      foundOrder.paymentStatus === "Pending Verification"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {foundOrder.paymentStatus}
  </span>

</div>
              <div className="mt-5">
                <p className="font-semibold mt-5 mb-2">
  Order Status
</p>

<span
  className={`px-4 py-2 rounded-full font-bold ${statusColor(
    foundOrder.status
  )}`}
>
  {foundOrder.status}
</span>
              </div>

            </div>

            {/* Timeline */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

              <h3 className="text-xl font-bold mb-6">
                📍 Order Progress
              </h3>

              {[
                "Pending Verification",
                "Payment Verified",
                "Processing",
                "Out For Delivery",
                "Delivered",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start mb-5"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      getStep(foundOrder.status) >= index + 1
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  >
                    ✓
                  </div>

                  <div className="ml-4">
                    <p
                      className={`font-semibold ${
                        getStep(foundOrder.status) >= index + 1
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </>
        )}

        {/* No Order */}
        {foundOrder === false && (
          <div className="mt-8 text-center text-red-600 font-bold">
            ❌ No order found.
            <br />
            Please check your Mobile Number and Order ID.
          </div>
        )}

      </div>

    </div>
  );
}

export default TrackOrder;