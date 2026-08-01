
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
//import { useProducts } from "../context/ProductsContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { SHOP } from "../config/shopConfig";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
const { addOrder } = useOrders();
// const { reduceStock } = useProducts();



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
const gst = totalPrice * 0.08;
const packing = totalPrice * 0.03;
const shipment = 100;
const grandTotal = totalPrice + gst + packing + shipment;


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Prepaid",
  
  });

  

  const handleCheckout = async () => {
    console.log("Checkout Started");
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
    console.log("Confirm OK");

    if (!confirmOrder) return;

    const orderDetails = cartItems
      .map(
        (item) =>
          `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");
console.log("Before Upload");
     

    const message = `
🎆 *New Order - ${SHOP.name}*

👤 Name: ${formData.name}

📞 Mobile: ${formData.phone}

📍 Address:
${formData.address}

🏙 City: ${formData.city}

📮 Pincode: ${formData.pincode}
💳 Payment: Completed ✅

🛒 Order:

${orderDetails}

💰 Items Total: ₹${totalPrice}

🧾 GST (8%): ₹${gst.toFixed(2)}

📦 Packing Charges (3%): ₹${packing.toFixed(2)}

🚚 Shipment Charges: ₹${shipment}

💵 Grand Total: ₹${grandTotal.toFixed(2)}
📷 Please attach your payment screenshot in this WhatsApp chat after sending this message.
📞 Contact:
${SHOP.phones[0]}

Our team will verify your payment and confirm your order.

Thank you! 😊
`;



const order = {
  id: Date.now(),
  customer: formData.name,
  phone: formData.phone,
  address: formData.address,
  city: formData.city,
  pincode: formData.pincode,
  source: "Website",
  
payment: "UPI",




  items: cartItems,

  subtotal: totalPrice,
gst,
packing,
shipment,
total: grandTotal,
paymentStatus: "Pending Verification",

status: "Pending Verification",

  orderDate: new Date().toLocaleString(),
};

await addDoc(collection(db, "orders"), order);
addOrder(order);

//for (const item of cartItems) {
  //await reduceStock(item.id, item.quantity);
//}

    const whatsappUrl = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;

    clearCart();

    setTimeout(() => {
      navigate("/success", {
  state: {
    order,
  },
});
    }, 500);
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          🧾 Checkout
        </h1>

        <div className="bg-white-900 p-8 rounded-2xl">
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
                className="w-full p-3 rounded-lg text-white"
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
                className="w-full p-3 rounded-lg text-white"
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
                className="w-full p-3 rounded-lg text-white"
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
                className="w-full p-3 rounded-lg text-white"
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
                className="w-full p-3 rounded-lg text-white"
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
<div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 mt-6">
  <h3 className="font-bold text-yellow-800 mb-2">
    📷 Payment Screenshot
  </h3>

  <p className="text-yellow-700">
    After clicking <strong>Place Order</strong>, WhatsApp will open automatically.
    Please attach your payment screenshot there and send it to complete your order verification.
  </p>
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

<div className="flex justify-between mt-2">
  <span>Items Total</span>
  <span>₹ {totalPrice.toLocaleString()}</span>
</div>

<div className="flex justify-between mt-2">
  <span>GST (8%)</span>
  <span>₹ {Math.round(gst)}</span>
</div>

<div className="flex justify-between mt-2">
  <span>Packing Charges (3%)</span>
  <span>₹ {Math.round(packing)}</span>
</div>

<div className="flex justify-between mt-2">
  <span>Shipment Charges</span>
  <span>₹ {shipment}</span>
</div>

<hr className="my-4 border-blue-700" />

<div className="flex justify-between text-2xl font-bold text-yellow-400">
  <span>Grand Total</span>

  <span>
    ₹ {Math.round(grandTotal).toLocaleString()}
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