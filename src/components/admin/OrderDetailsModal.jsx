function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onStatusChange,
}) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            📦 Order Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl font-bold text-gray-500 hover:text-red-600"
          >
            ✕
          </button>

        </div>
<div className="bg-gray-100 rounded-2xl p-6">

  <h3 className="text-2xl font-bold mb-5">
    👤 Customer Information
  </h3>

  <div className="grid md:grid-cols-2 gap-5">

    <div>
      <p className="text-gray-500 font-semibold">
        Customer Name
      </p>
      <p className="text-lg font-bold">
        {order.customer}
      </p>
    </div>

    <div>
      <p className="text-gray-500 font-semibold">
        Mobile Number
      </p>
      <p className="text-lg font-bold">
        {order.phone}
      </p>
    </div>

    <div className="md:col-span-2">
      <p className="text-gray-500 font-semibold">
        Delivery Address
      </p>
      <p className="font-medium">
        {order.address}
      </p>
    </div>

    <div>
      <p className="text-gray-500 font-semibold">
        City
      </p>
      <p>{order.city}</p>
    </div>

    <div>
      <p className="text-gray-500 font-semibold">
        Pincode
      </p>
      <p>{order.pincode}</p>
    </div>

    <div>
      <p className="text-gray-500 font-semibold">
        Payment
      </p>

      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
        {order.payment}
      </span>
    </div>

    <div>
      <p className="text-gray-500 font-semibold">
        Order Date
      </p>
      <p>{order.orderDate}</p>
    </div>

  </div>

</div>

        <hr className="my-6" />

        <h3 className="text-xl font-bold mb-3">
          🛒 Products
        </h3>

        <div className="space-y-3">

          {order.items.map((item) => (

  <div
    key={item.id}
    className="flex items-center justify-between bg-gray-100 rounded-xl p-4"
  >

    <div className="flex items-center gap-4">

      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-xl object-cover border"
      />

      <div>

        <h4 className="font-bold">
          {item.name}
        </h4>

        <p className="text-gray-500">
          Qty : {item.quantity}
        </p>

      </div>

    </div>

    <span className="font-bold text-green-600">
      ₹ {(item.price * item.quantity).toLocaleString()}
    </span>

  </div>

))}

        </div>

        <div className="flex justify-between mt-8 text-2xl font-bold">

          <span>Total</span>

          <span>
            ₹ {(order.total || 0).toLocaleString()}
          </span>

        </div>

        <div className="mt-8">
<label className="block font-semibold mb-2">
  Current Status
</label>

<div
  className={`inline-block mb-4 px-4 py-2 rounded-full font-bold ${
    order.status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : order.status === "Processing"
      ? "bg-blue-100 text-blue-700"
      : order.status === "Delivered"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {order.status}
</div>

<label className="block font-semibold mb-2">
  Change Status
</label>

<select
  value={order.status}
  onChange={(e) => onStatusChange(e.target.value)}
  className={`w-full rounded-xl p-3 font-bold border-2 ${
  order.status === "Pending"
    ? "bg-yellow-100 border-yellow-400 text-yellow-700"
    : order.status === "Processing"
    ? "bg-blue-100 border-blue-400 text-blue-700"
    : order.status === "Delivered"
    ? "bg-green-100 border-green-400 text-green-700"
    : order.status === "Cancelled"
    ? "bg-red-100 border-red-400 text-red-700"
    : ""
}`}
>
    <option>Pending</option>
    <option>Processing</option>
    <option>Delivered</option>
    <option>Cancelled</option>
  </select>

</div>

      </div>

    </div>
  );
}

export default OrderDetailsModal;