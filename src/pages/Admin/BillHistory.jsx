import { useEffect, useState } from "react";
import Invoice from "../../components/billing/Invoice";

function BillHistory() {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    const savedBills =
      JSON.parse(localStorage.getItem("bills")) || [];

    setBills(savedBills);
  }, []);
       const filteredBills = bills.filter((bill) => {
  const matchesSearch =
    bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.customerMobile.includes(searchTerm);

    const filteredBills = bills.filter((bill) => {
  const matchesSearch =
    bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.customerMobile.includes(searchTerm);

  const matchesPayment =
    paymentFilter === "All" ||
    bill.paymentMethod === paymentFilter;

  let matchesDate = true;

  if (dateFilter === "Today") {
    const today = new Date().toDateString();
    matchesDate = new Date(bill.date).toDateString() === today;
  }

  return matchesSearch && matchesPayment && matchesDate;
});

  const matchesPayment =
    paymentFilter === "All" ||
    bill.paymentMethod === paymentFilter;

  return matchesSearch && matchesPayment;
});




  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        📜 Bill History
      </h1>

        <div className="mt-4 mb-6">
  <input
    type="text"
    placeholder="🔍 Search by Bill No, Customer or Mobile..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full border rounded-lg p-3"
  />

  <div className="flex gap-3 mt-4 flex-wrap">

    <div className="flex gap-3 mt-4 flex-wrap">

  <button
    onClick={() => setDateFilter("All")}
    className={`px-4 py-2 rounded-lg ${
      dateFilter === "All"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    📅 All Dates
  </button>

  <button
    onClick={() => setDateFilter("Today")}
    className={`px-4 py-2 rounded-lg ${
      dateFilter === "Today"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    📅 Today
  </button>

</div>

  <button
    onClick={() => setPaymentFilter("All")}
    className={`px-4 py-2 rounded-lg ${
      paymentFilter === "All"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setPaymentFilter("Cash")}
    className={`px-4 py-2 rounded-lg ${
      paymentFilter === "Cash"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    💵 Cash
  </button>

  <button
    onClick={() => setPaymentFilter("UPI")}
    className={`px-4 py-2 rounded-lg ${
      paymentFilter === "UPI"
        ? "bg-purple-600 text-white"
        : "bg-gray-200"
    }`}
  >
    📱 UPI
  </button>

  <button
    onClick={() => setPaymentFilter("Card")}
    className={`px-4 py-2 rounded-lg ${
      paymentFilter === "Card"
        ? "bg-orange-600 text-white"
        : "bg-gray-200"
    }`}
  >
    💳 Card
  </button>

</div>
</div>
      <table className="w-full bg-white rounded-lg shadow">

        <thead className="bg-yellow-400">

          <tr>
            <th className="p-3">Bill No</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Payment</th>
            <th className="p-3">Total</th>
          </tr>

        </thead>

        <tbody>

          {filteredBills.map((bill) => (

            <tr
  key={bill.billNo}
  className="border-t hover:bg-gray-100 cursor-pointer"
  onClick={() => setSelectedBill(bill)}
>

              <td className="p-3">{bill.billNo}</td>
              <td>{bill.customerName}</td>
              <td>{bill.customerMobile}</td>
              <td>{bill.paymentMethod}</td>
              <td>₹{bill.grandTotal}</td>

            </tr>

          ))}

        </tbody>

      </table>

  {selectedBill && <Invoice bill={selectedBill} />}
  <div className="flex justify-end mt-6">
  <button
    onClick={() => window.print()}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
  >
    🖨️ Print Invoice
  </button>
</div>

    </div>
  );
}

export default BillHistory;