function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onStatusChange,
}) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-3xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            📦 Order Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl font-bold text-gray-500 hover:text-red-600"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <p className="font-semibold text-gray-500">
              Customer
            </p>

            <p className="text-xl font-bold">
              {order.customer}
            </p>

          </div>

          <div>

            <p className="font-semibold text-gray-500">
              Phone
            </p>

            <p className="text-xl font-bold">
              {order.phone}
            </p>

          </div>

          <div className="col-span-2">

            <p className="font-semibold text-gray-500">
              Address
            </p>

            <p>
              {order.address}
            </p>

          </div>

          <div>

            <p className="font-semibold text-gray-500">
              City
            </p>

            <p>{order.city}</p>

          </div>

          <div>

            <p className="font-semibold text-gray-500">
              Pincode
            </p>

            <p>{order.pincode}</p>

          </div>

        </div>

        <hr className="my-6" />

        <h3 className="text-2xl font-bold mb-4">
          🛒 Products
        </h3>

        <div className="space-y-3">

          {order.items.map((item) => (

            <div
              key={item.id}
              className="flex justify-between bg-gray-100 rounded-xl p-4"
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <span className="font-bold">
                ₹ {item.price * item.quantity}
              </span>

            </div>

          ))}

        </div>

        <div className="flex justify-between mt-8 text-2xl font-bold">

          <span>Total</span>

          <span>
            ₹ {order.total.toLocaleString()}
          </span>

        </div>

        <div className="mt-8">

  <label className="block font-semibold mb-2">
    Order Status
  </label>

  <select
    value={order.status}
    onChange={(e) => onStatusChange(e.target.value)}
    className="w-full border rounded-xl p-3"
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