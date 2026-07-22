import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useOrders } from "../../context/OrdersContext";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";


function Orders() {
  const { orders, updateOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

const ordersPerPage = 10;
const [isModalOpen, setIsModalOpen] = useState(false);

const filteredOrders = orders.filter((order) => {
  const matchesSearch =
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone.includes(searchTerm) ||
    String(order.id).includes(searchTerm);

    
  

  const matchesStatus =
    statusFilter === "All" ||
    order.status === statusFilter;

    const orderDate = new Date(order.orderDate);
const today = new Date();

let matchesDate = true;

if (dateFilter === "Today") {
  matchesDate =
    orderDate.toDateString() === today.toDateString();
}

if (dateFilter === "This Month") {
  matchesDate =
    orderDate.getMonth() === today.getMonth() &&
    orderDate.getFullYear() === today.getFullYear();
}

  return (
  matchesSearch &&
  matchesStatus &&
  matchesDate
);
});
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, statusFilter, dateFilter]);

const indexOfLastOrder = currentPage * ordersPerPage;
const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

const currentOrders = filteredOrders.slice(
  indexOfFirstOrder,
  indexOfLastOrder
);

const totalPages = Math.ceil(
  filteredOrders.length / ordersPerPage
);

const totalOrders = orders.length;

const pendingOrders = orders.filter(
  (order) => order.status === "Pending"
).length;

const processingOrders = orders.filter(
  (order) => order.status === "Processing"
).length;

const deliveredOrders = orders.filter(
  (order) => order.status === "Delivered"
).length;

const cancelledOrders = orders.filter(
  (order) => order.status === "Cancelled"
).length;

const deliveredList = orders.filter(
  (order) => order.status === "Delivered"
);

const totalRevenue = deliveredList.reduce(
  (sum, order) => sum + Number(order.total || 0),
  0
);

const averageOrder =
  deliveredList.length > 0
    ? Math.round(totalRevenue / deliveredList.length)
    : 0;

const highestOrder =
  deliveredList.length > 0
    ? Math.max(...deliveredList.map((o) => Number(o.total || 0)))
    : 0;

const today = new Date();

const todayRevenue = deliveredList
  .filter((order) => {
    const d = new Date(order.orderDate);
    return d.toDateString() === today.toDateString();
  })
  .reduce((sum, order) => sum + Number(order.total || 0), 0);

const monthRevenue = deliveredList
  .filter((order) => {
    const d = new Date(order.orderDate);
    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  })
  .reduce((sum, order) => sum + Number(order.total || 0), 0);


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

<div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-8 mb-8">

  <div className="bg-white rounded-2xl shadow-lg p-5">
    <p className="text-gray-500">Total Orders</p>
    <h2 className="text-4xl font-bold text-yellow-400 mt-2">
      {totalOrders}
    </h2>
  </div>

  <div className="bg-yellow-50 rounded-2xl shadow-lg p-5">
    <p className="text-yellow-700">Pending</p>
    <h2 className="text-4xl font-bold text-yellow-600 mt-2">
      {pendingOrders}
    </h2>
  </div>

  <div className="bg-blue-50 rounded-2xl shadow-lg p-5">
    <p className="text-blue-700">Processing</p>
    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {processingOrders}
    </h2>
  </div>

  <div className="bg-green-50 rounded-2xl shadow-lg p-5">
    <p className="text-green-700">Delivered</p>
    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {deliveredOrders}
    </h2>
  </div>

  <div className="bg-red-50 rounded-2xl shadow-lg p-5">
    <p className="text-red-700">Cancelled</p>
    <h2 className="text-4xl font-bold text-red-600 mt-2">
      {cancelledOrders}
    </h2>
  </div>

</div>

<input
  type="text"
  placeholder="🔍 Search Customer / Phone / Order ID..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="border border-gray-300 rounded-xl px-4 py-3 mb-6 ml-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="All">All Status</option>
  <option value="Pending">Pending</option>
  <option value="Processing">Processing</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

<select
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}
  className="border border-gray-300 rounded-xl px-4 py-3 mb-6 ml-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="All">All Dates</option>
  <option value="Today">Today</option>
  <option value="This Month">This Month</option>
</select>

<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

  <div className="bg-green-50 rounded-2xl shadow-lg p-5">
    <p className="text-green-700">Today's Revenue</p>

    <h2 className="text-3xl font-bold text-green-600 mt-2">
      ₹ {todayRevenue.toLocaleString()}
    </h2>
  </div>

  <div className="bg-blue-50 rounded-2xl shadow-lg p-5">
    <p className="text-blue-700">This Month</p>

    <h2 className="text-3xl font-bold text-blue-600 mt-2">
      ₹ {monthRevenue.toLocaleString()}
    </h2>
  </div>

  <div className="bg-yellow-50 rounded-2xl shadow-lg p-5">
    <p className="text-yellow-700">Average Order</p>

    <h2 className="text-3xl font-bold text-yellow-600 mt-2">
      ₹ {averageOrder.toLocaleString()}
    </h2>
  </div>

  <div className="bg-purple-50 rounded-2xl shadow-lg p-5">
    <p className="text-purple-700">Highest Order</p>

    <h2 className="text-3xl font-bold text-purple-600 mt-2">
      ₹ {highestOrder.toLocaleString()}
    </h2>
  </div>

</div>

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

  {currentOrders.map((order) => (

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
        ₹ {(order.total || 0).toLocaleString()}
      </td>

      <td className="p-4">
        {order.orderDate}
      </td>

      <td className="p-4">

       <span
  className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

  <div className="flex justify-center items-center gap-3 py-6">

  <button
    onClick={() =>
      setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
    disabled={currentPage === 1}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
  >
    ← Prev
  </button>

  <span className="font-semibold">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages || totalPages === 0}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
  >
    Next →
  </button>

</div>

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