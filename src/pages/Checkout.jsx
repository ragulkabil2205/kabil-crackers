import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalMRP = cartItems.reduce(
  (total, item) =>
    total + item.originalPrice * item.quantity,
  0
);

const totalSaved = totalMRP - totalPrice;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const handleCheckout = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const confirmOrder = window.confirm(
      "Are you sure you want to place this order?"
    );

    if (!confirmOrder) return;

    const orderDetails = cartItems
      .map(
        (item) =>
          `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");

    const message = `
🎆 *New Order - Kabil Crackers*

👤 Name: ${formData.name}

📞 Mobile: ${formData.phone}

📍 Address:
${formData.address}

🏙 City: ${formData.city}

📮 Pincode: ${formData.pincode}
💳 Payment: Completed ✅

🛒 Order:

${orderDetails}

💰 Total: ₹${totalPrice}
📎 I have attached my payment screenshot below.

Thank you! 😊
`;

    const whatsappUrl = `https://wa.me/918428902102?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    clearCart();

    setTimeout(() => {
      navigate("/success");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          🧾 Checkout
        </h1>

        <div className="bg-blue-900 p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block mb-2">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-3 rounded-lg text-black"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2">Address</label>
              <textarea
                rows="4"
                placeholder="Enter delivery address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full p-3 rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block mb-2">City</label>
              <input
                type="text"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full p-3 rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block mb-2">Pincode</label>
              
              <input
                type="text"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                className="w-full p-3 rounded-lg text-black"
              />
            </div>
          </div>
         
         <div className="bg-green-900 border border-green-500 rounded-xl p-5 mt-8">

  <h3 className="text-xl font-bold text-green-300">
    💳 Payment Information
  </h3>

  <p className="mt-3 text-red-300 font-semibold">
    🚫 No Cash on Delivery (COD)
  </p>

  <p className="mt-2 text-green-300 font-semibold">
    ✅ Prepaid Orders Only
  </p>

  <div className="mt-4 space-y-2 text-gray-200">

    <p>• Google Pay</p>

    <p>• PhonePe</p>

    <p>• Paytm</p>

    <p>• UPI</p>

    <p>• Bank Transfer</p>

  </div>
  <div className="mt-8 flex flex-col items-center">

  <img
    src="/images/payment/upi-qr.jpg"
    alt="UPI QR Code"
    className="w-64 rounded-xl border-4 border-white shadow-xl"
  />

  <p className="mt-4 text-lg font-bold text-yellow-300">
    📲 Scan & Pay using any UPI App
  </p>

  <p className="text-gray-300 text-center mt-2">
    Google Pay • PhonePe • Paytm • BHIM
  </p>
  <div className="mt-6 w-full max-w-md bg-blue-950 border border-blue-700 rounded-xl p-5">

  <h4 className="text-xl font-bold text-yellow-400 mb-4">
    Payment Details
  </h4>

  <div className="space-y-3">

    <p>
      👤 <span className="font-semibold">Account Name:</span><br />
      <span className="text-green-300">RAGUL KABIL S</span>
    </p>

    <p>
      📱 <span className="font-semibold">UPI ID:</span><br />
      <span className="text-yellow-300 font-mono">
        kabilkutty22-1@okhdfcbank <br></br>
                kabilkutty22-1@okicici
      </span>
    </p>

    <p>
      🏦 <span className="font-semibold">Bank:</span><br />
      <span className="text-green-300">
        HDFC Bank <br></br>
        Bank Of Baroda 

      </span>
    </p>

  </div>

</div>

</div>

</div>
          

          <div className="mt-10 bg-blue-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-blue-700 py-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>₹ {item.price * item.quantity}</span>
              </div>
            ))}

            <div className="flex justify-between mt-5">
  <span>MRP Total</span>

  <span className="line-through text-gray-400">
    ₹ {totalMRP.toLocaleString()}
  </span>
</div>

<div className="flex justify-between mt-3 text-green-400 font-bold">
  <span>Discount Saved</span>

  <span>
    ₹ {totalSaved.toLocaleString()}
  </span>
</div>

<hr className="my-4 border-blue-700" />

<div className="flex justify-between text-2xl font-bold text-yellow-400">
  <span>You Pay</span>

  <span>
    ₹ {totalPrice.toLocaleString()}
  </span>
</div>

<p className="mt-4 text-center text-green-400 font-bold">
  🎉 You Saved ₹{totalSaved.toLocaleString()}
</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

  <div className="bg-blue-800 rounded-xl p-4 text-center">
    <p className="text-2xl">🔒</p>
    <p className="font-semibold mt-2">
      100% Secure Payment
    </p>
  </div>

  <div className="bg-blue-800 rounded-xl p-4 text-center">
    <p className="text-2xl">🚫</p>
    <p className="font-semibold mt-2">
      No COD
    </p>
  </div>

  <div className="bg-blue-800 rounded-xl p-4 text-center">
    <p className="text-2xl">🧾</p>
    <p className="font-semibold mt-2">
      GST Registered Seller
    </p>
  </div>

  <div className="bg-blue-800 rounded-xl p-4 text-center">
    <p className="text-2xl">🚚</p>
    <p className="font-semibold mt-2">
      Fast Delivery
    </p>
  </div>

</div>

          <button
            onClick={handleCheckout}
            className="mt-8 w-full bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300"
          >
            📲 Share Order & Payment to Kabil Crackers
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;