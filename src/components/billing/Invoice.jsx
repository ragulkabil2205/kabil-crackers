function Invoice({ bill }) {
  if (!bill) return null;

  return (
    <div
      id="invoice"
      className="bg-white text-black p-8 rounded-lg shadow max-w-4xl mx-auto"
    >
      <div className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold">KABIL CRACKERS</h1>

        <p>No. XX, Sivakasi, Tamil Nadu</p>

        <p>Mobile: +91 XXXXX XXXXX</p>
      </div>

      <div className="flex justify-between mt-6">

        <div>
          <p><strong>Bill No:</strong> {bill.billNo}</p>
          <p><strong>Date:</strong> {bill.date}</p>
        </div>

        <div className="text-right">
          <p><strong>Customer:</strong> {bill.customerName}</p>
          <p><strong>Mobile:</strong> {bill.customerMobile}</p>
        </div>

      </div>

      <table className="w-full mt-6 border border-collapse">

        <thead className="bg-gray-200">

          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">Total</th>
          </tr>

        </thead>

        <tbody>

          {bill.billItems.map((item) => (

            <tr key={item.id}>

              <td className="border p-2">{item.name}</td>

              <td className="border p-2 text-center">
                {item.qty}
              </td>

              <td className="border p-2 text-center">
                ₹{item.price}
              </td>

              <td className="border p-2 text-center">
                ₹{item.qty * item.price}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="text-right mt-6">

        <h2 className="text-2xl font-bold">
          Grand Total : ₹{bill.grandTotal}
        </h2>

        <p className="mt-2">
          Payment : {bill.paymentMethod}
        </p>

      </div>

      <div className="text-center mt-10 border-t pt-4">
        <h3 className="font-bold text-lg">
          🙏 Thank You! Visit Again 🙏
        </h3>
      </div>

    </div>
  );
}

export default Invoice;