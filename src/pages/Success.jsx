import { Link, useLocation } from "react-router-dom";
import { SHOP } from "../config/shopConfig";
import { generateInvoice } from "../utils/generateInvoice";

function Success() {
  const { state } = useLocation();

const order = state?.order;

  const sampleOrder = {
  id: "KC10001",
  orderDate: new Date().toLocaleDateString(),

  subtotal: 5000,
  gst: 400,
  packing: 150,
  shipment: 100,
  total: 5650,

  items: [
    {
      name: "30 Shot",
      quantity: 2,
      price: 750,
    },
    {
      name: "Colour Koti",
      quantity: 5,
      price: 300,
    },
  ],
};
  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-6 py-10">
      <div className="bg-blue-900 p-10 rounded-3xl text-center max-w-xl w-full shadow-2xl">

        <div className="text-7xl mb-5">🎉</div>

        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-300 mb-2">
          Thank you for shopping with
        </p>

        <h2 className="text-2xl font-bold text-yellow-400 mb-6">
          {SHOP.name}
        </h2>

        <div className="bg-blue-800 rounded-xl p-5 text-left mb-8 space-y-2">

          <p>📞 {SHOP.phones[0]}</p>

          <p>💬 WhatsApp: {SHOP.whatsapp}</p>

          <p>📧 {SHOP.email}</p>

          <p>
            📍 {SHOP.address.city}, {SHOP.address.state}
          </p>

        </div>

        <p className="text-green-400 font-semibold mb-8">
          ✅ Our team will verify your payment and process your order shortly.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

<button
  onClick={() => {
  if (order) {
    generateInvoice(order);
  } else {
    alert("Order not found.");
  }
}}
  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
>
  📄 Download Invoice
</button>

          <Link to="/track-order">
            <button className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition">
              📦 Track Order
            </button>
          </Link>

          <Link to="/">
            <button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-bold transition">
              🛍️ Continue Shopping
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Success;