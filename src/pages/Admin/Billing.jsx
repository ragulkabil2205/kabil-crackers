import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import { generateBillNumber } from "../../billing/billUtils";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useOrders } from "../../context/OrdersContext";

function Billing() {
    const { products, reduceStock } = useProducts();
  const [search, setSearch] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
const [customerMobile, setCustomerMobile] = useState("");
const [paymentMethod, setPaymentMethod] = useState("Cash");
const [isSaving, setIsSaving] = useState(false);
const { addOrder } = useOrders();

  
const filteredProducts = products
  .filter((product) => Number(product.stock) > 0)
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const grandTotal = billItems.reduce(
  (total, item) => total + item.qty * item.price,
  0
);

  const addToBill = (product) => {
  const existing = billItems.find((item) => item.id === product.id);

  if (existing) {
    setBillItems(
      billItems.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  } else {
    setBillItems([
      ...billItems,
      {
        ...product,
        qty: 1,
      },
    ]);
  }
};

const increaseQty = (id) => {
  setBillItems(
    billItems.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
  );
};

const decreaseQty = (id) => {
  setBillItems(
    billItems
      .map((item) =>
        item.id === id
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter((item) => item.qty > 0)
  );
};

const saveBill = async () => {
  if (isSaving) return;

setIsSaving(true);
  if (billItems.length === 0) {
  alert("Please add at least one product.");
  setIsSaving(false);
  return;
}
  for (const item of billItems) {
  const success = await reduceStock(item.id, item.qty);

  if (!success) {
  setIsSaving(false);
  return;
}
}
  const bill = {
    billNo: generateBillNumber(),
    customerName,
    customerMobile,
    paymentMethod,
    billItems,
    grandTotal,
    date: new Date().toLocaleString(),
  };

  const firestoreOrder = {
  id: Date.now(),

  customer: customerName,
  phone: customerMobile,

  address: "Direct Shop Sale",
  city: "Shop",
  pincode: "-",
  source: "Admin Billing",

  items: billItems.map((item) => ({
    ...item,
    quantity: item.qty,
  })),

  subtotal: grandTotal,
  gst: 0,
  packing: 0,
  shipment: 0,
  total: grandTotal,

  payment: paymentMethod, // Cash / UPI / Card

  paymentStatus: "Paid",
  status: "Delivered",

  stockReduced: true,

  orderDate: new Date().toLocaleString(),
};

await addDoc(collection(db, "orders"), firestoreOrder);
addOrder(firestoreOrder);

  console.log(bill);
const oldBills = JSON.parse(localStorage.getItem("bills")) || [];

oldBills.push(bill);

localStorage.setItem("bills", JSON.stringify(oldBills));

setCustomerName("");
setCustomerMobile("");
setPaymentMethod("Cash");
setBillItems([]);
setSearch("");
  alert(`Bill ${bill.billNo} saved successfully!`);
  setIsSaving(false);
};



  return (

    
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        🧾 Billing
      </h1>
        <div className="bg-white rounded-lg shadow p-5">

  <h2 className="text-xl font-bold mb-4">
    Customer Details
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <input
      type="text"
      placeholder="Customer Name"
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      className="border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Mobile Number"
      value={customerMobile}
      onChange={(e) => setCustomerMobile(e.target.value)}
      className="border rounded-lg p-3"
    />

  </div>

</div>
      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3"
      />

      <div className="bg-white rounded-lg shadow">

        <table className="w-full">

          <thead className="bg-yellow-400">

            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr key={product.id} className="border-t">

                <td className="p-3">
                  {product.name}
                </td>

                <td className="text-center">
                  ₹{product.price}
                </td>

                <td className="text-center font-bold">
  {product.stock}
</td>

                <td className="text-center">

                  <button
  onClick={() => addToBill(product)}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Add
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="bg-white rounded-lg shadow p-4 mt-6">

  <h2 className="text-2xl font-bold mb-4">
    Bill Items
  </h2>

  <table className="w-full">

    <thead className="bg-gray-200">
      <tr>
        <th className="p-2 text-left">Product</th>
        <th className="p-2">Qty</th>
        <th className="p-2">Price</th>
        <th className="p-2">Total</th>
      </tr>
    </thead>

    <tbody>

      {billItems.map((item) => (

        <tr key={item.id} className="border-t">

          <td className="p-2">{item.name}</td>

          <td className="text-center">
  <div className="flex justify-center items-center gap-2">

    <button
      onClick={() => decreaseQty(item.id)}
      className="bg-red-500 text-white w-8 h-8 rounded"
    >
      -
    </button>

    <span className="font-bold">
      {item.qty}
    </span>

    <button
      onClick={() => increaseQty(item.id)}
      className="bg-green-600 text-white w-8 h-8 rounded"
    >
      +
    </button>

  </div>
</td>

          <td className="text-center">
            ₹{item.price}
          </td>

          <td className="text-center">
            ₹{item.qty * item.price}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

  <div className="flex justify-end mt-6">

  <div className="bg-yellow-100 p-4 rounded-lg shadow">

    <h2 className="text-2xl font-bold">
      Grand Total
    </h2>

    <p className="text-3xl font-bold text-green-700">
      ₹{grandTotal}
    </p>

    <div className="bg-white rounded-lg shadow p-4 mt-6">

  <h2 className="font-bold mb-3">
    Payment Method
  </h2>

  <select
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
    className="border rounded-lg p-3 w-full"
  >
    <option>Cash</option>
    <option>UPI</option>
    <option>Card</option>
  </select>

 <button
  onClick={saveBill}
  disabled={isSaving}
  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
>
  {isSaving ? "Saving..." : "💾 Save Bill"}
</button>

</div>

  </div>

</div>

</div>

      </div>

    </div>
  );
}

export default Billing;