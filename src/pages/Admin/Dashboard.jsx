import { useEffect, useState } from "react";
import { useOrders } from "../../context/OrdersContext";

import { useProducts } from "../../context/ProductsContext";

import { useNavigate } from "react-router-dom";
import NewOrderNotification from "../../components/admin/NewOrderNotification";

function Dashboard() {
  

  const { products } = useProducts();
  const navigate = useNavigate();

  const totalQuantity = products.reduce(
  (sum, product) => sum + (Number(product.stock) || 0),
  0
);

const lowStockProducts = products.filter(
  (product) =>
    Number(product.stock) > 0 &&
    Number(product.stock) <= 10
).length;

const outOfStockProducts = products.filter(
  (product) => Number(product.stock) === 0
).length;

    const totalProducts = products.length;

    const bestSellers = products.filter(
  (item) => item.bestseller
).length;

const totalCategories = new Set(
  products.map((item) => item.category)
).size;

const { orders } = useOrders();

const totalOrders = orders.length;

const pendingOrders = orders.filter(
  (order) => order.status === "Pending"
).length;

const deliveredOrders = orders.filter(
  (order) => order.status === "Delivered"
).length;

const totalRevenue = orders
  .filter((order) => order.status === "Delivered")
  .reduce((sum, order) => sum + order.total, 0);

  const latestOrder =
  orders.length > 0
    ? [...orders].sort(
        (a, b) =>
          new Date(b.orderDate) -
          new Date(a.orderDate)
      )[0]
    : null;

    const [stats, setStats] = useState({
  totalBills: 0,
  totalSales: 0,
});

useEffect(() => {
  const bills = JSON.parse(localStorage.getItem("bills")) || [];

  const totalSales = bills.reduce(
    (sum, bill) => sum + bill.grandTotal,
    0
  );

  setStats({
    totalBills: bills.length,
    totalSales,
  });
}, []);


  return (
<>

<NewOrderNotification latestOrder={latestOrder} />

        <div className="p-4 sm:p-5 sm:p-6md:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h2>

          <p className="text-gray-500 mt-2">
            Welcome back! Manage your products from here.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-10 gap-6 mt-10">

           <div
  onClick={() => navigate("/admin/products?filter=all")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
              <h3 className="text-gray-500">Total Products</h3>
              <p className="text-3xl sm:text-4xl font-bold mt-3 text-blue-600">
                {totalProducts}

              </p>
              <p className="text-sm text-blue-600 mt-4 font-semibold">
  View All →
</p>
            </div>
            <div
  onClick={() => navigate("/admin/orders")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
  <h3 className="text-gray-500">Total Orders</h3>

  <p className="text-3xl sm:text-4xl font-bold mt-3 text-green-600">
    {totalOrders}
  </p>

  <p className="text-sm text-green-600 mt-4 font-semibold">
    All Orders
  </p>
</div>

<div
  onClick={() => navigate("/admin/orders")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
  <h3 className="text-gray-500">Pending Orders</h3>

  <p className="text-3xl sm:text-4xl font-bold mt-3 text-yellow-500">
    {pendingOrders}
  </p>

  <p className="text-sm text-yellow-500 mt-4 font-semibold">
    Need Attention
  </p>
</div>

<div
  onClick={() => navigate("/admin/orders")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
  <h3 className="text-gray-500">Delivered Orders</h3>

  <p className="text-3xl sm:text-4xl font-bold mt-3 text-green-600">
    {deliveredOrders}
  </p>

  <p className="text-sm text-green-600 mt-4 font-semibold">
    Successfully Delivered
  </p>
</div>

<div
  onClick={() => alert("Revenue Reports Coming Soon")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
  <h3 className="text-gray-500">Revenue</h3>

  <p className="text-3xl sm:text-4xl font-bold mt-3 text-purple-600">
    ₹ {totalRevenue.toLocaleString()}
  </p>

  <p className="text-sm text-purple-600 mt-4 font-semibold">
    Delivered Orders
  </p>
</div>


           <div
  onClick={() => navigate("/admin/products?filter=bestseller")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
              <h3 className="text-gray-500">Best Sellers</h3>
              <p className="text-3xl sm:text-4xl font-bold mt-3 text-green-600">
                {bestSellers}
              </p>
              <p className="text-sm text-green-600 mt-4 font-semibold">
  View Best Sellers →
</p>
            </div>

            <div
  onClick={() => navigate("/admin/products?filter=outofstock")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
              <h3 className="text-gray-500">Out of Stock</h3>
              <p className="text-3xl sm:text-4xl font-bold mt-3 text-red-600">
  {outOfStockProducts}
</p>

<p className="text-sm text-red-600 mt-4 font-semibold">
  Restock Products →
</p>
            </div>

            

            <div
  onClick={() => alert("Coming Soon")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
              <h3 className="text-gray-500">Categories</h3>
              <p className="text-3xl sm:text-4xl font-bold mt-3 text-yellow-500">
  {totalCategories}
</p>
<p className="text-sm text-yellow-600 mt-4 font-semibold">
  Manage Categories →
</p>
            </div>

            <div
  onClick={() => navigate("/admin/products")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
  <h3 className="text-gray-500">Total Quantity</h3>

  <p className="text-3xl sm:text-4xl font-bold mt-3 text-green-600">
    {totalQuantity}
  </p>

  <p className="text-sm text-green-600 mt-4 font-semibold">
    Available Units
  </p>
</div>

<div
  onClick={() => navigate("/admin/products?filter=lowstock")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
  <h3 className="text-gray-500">Low Stock</h3>

  <p className="text-3xl sm:text-4xl font-bold mt-3 text-orange-500">
    {lowStockProducts}
  </p>

  <p className="text-sm text-orange-500 mt-4 font-semibold">
    Need Restock
  </p>
</div>
<div
  onClick={() => navigate("/admin/bill-history")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl  hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
  <h3 className="text-gray-500">Billing Software Bills</h3>

  <p className="text-3xl sm:text-4xl font-bold mt-3 text-blue-600">
    {stats.totalBills}
  </p>

  <p className="text-sm text-blue-600 mt-4 font-semibold">
    View Bill History →
  </p>
</div>

<div
  onClick={() => navigate("/admin/bill-history")}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
>
  <h3 className="text-gray-500">Billing Software Sales</h3>

  <p className="text-3xl sm:text-4xl font-bold mt-3 text-green-600">
    ₹ {stats.totalSales.toLocaleString()}
  </p>

  <p className="text-sm text-green-600 mt-4 font-semibold">
    View Billing Reports →
  </p>
</div>

<div className="mt-10">

  <button
    onClick={() => navigate("/admin/sales")}
    className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 rounded-2xl text-lg sm:text-xl font-bold shadow-lg transition"
  >
    📊 Open Sales Analytics
  </button>

</div>

        

          </div>

        </div>

      </>

    

  );



}

export default Dashboard;