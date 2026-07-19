import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useOrders } from "../../context/OrdersContext";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";


function Orders() {
  const { orders, updateOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const handleStatusChange = (newStatus) => {
  const updatedOrder = {
    ...selectedOrder,
    status: newStatus,
  };

  updateOrder(updatedOrder);
  setSelectedOrder(updatedOrder);
};

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

         <h1 className="text-3xl font-bold text-gray-800">
  📦 Orders Management
</h1>

<p className="text-gray-500 mt-2 mb-8">
  Total Orders : {orders.length}
</p>

<div className="bg-white rounded-2xl shadow-lg overflow-hidden">

  <table className="w-full">

    <thead className="bg-blue-700 text-white">

      <tr>

        <th className="p-4 text-left">
          Order ID
        </th>

        <th className="p-4 text-left">
          Customer
        </th>

        <th className="p-4 text-left">
          Phone
        </th>

        <th className="p-4 text-left">
          Total
        </th>

        <th className="p-4 text-left">
          Date
        </th>

        <th className="p-4 text-left">
          Status
        </th>

        <th className="p-4 text-center">
          Actions
        </th>

      </tr>

    </thead>

    <tbody>

  {orders.map((order) => (

    <tr
      key={order.id}
      className="border-b hover:bg-blue-50 transition"
    >

      <td className="p-4 font-semibold">
        #{order.id}
      </td>

      <td className="p-4">
        {order.customer}
      </td>

      <td className="p-4">
        {order.phone}
      </td>

      <td className="p-4 font-bold text-green-600">
        ₹ {order.total.toLocaleString()}
      </td>

      <td className="p-4">
        {order.orderDate}
      </td>

      <td className="p-4">

        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
          {order.status}
        </span>

      </td>

      <td className="p-4 text-center">

       <button
  onClick={() => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  👁 View
</button>

      </td>

    </tr>

  ))}

</tbody>

  </table>

</div>
        </div>

      </div>
<OrderDetailsModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }}
  order={selectedOrder}
  onStatusChange={handleStatusChange}
/>
    </div>
  );
}

export default Orders;