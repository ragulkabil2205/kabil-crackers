import { useOrders } from "../../context/OrdersContext";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useProducts } from "../../context/ProductsContext";

function Dashboard() {

  const { products } = useProducts();

    const totalProducts = products.length;

    const bestSellers = products.filter(
  (item) => item.bestseller
).length;

const outOfStock = products.filter(
  (item) => !item.inStock
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


  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h2>

          <p className="text-gray-500 mt-2">
            Welcome back! Manage your products from here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mt-10">

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
              <h3 className="text-gray-500">Total Products</h3>
              <p className="text-4xl font-bold mt-3 text-blue-600">
                {totalProducts}

              </p>
              <p className="text-sm text-blue-600 mt-4 font-semibold">
  View All →
</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
  <h3 className="text-gray-500">Total Orders</h3>

  <p className="text-4xl font-bold mt-3 text-green-600">
    {totalOrders}
  </p>

  <p className="text-sm text-green-600 mt-4 font-semibold">
    All Orders
  </p>
</div>

<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
  <h3 className="text-gray-500">Pending Orders</h3>

  <p className="text-4xl font-bold mt-3 text-yellow-500">
    {pendingOrders}
  </p>

  <p className="text-sm text-yellow-500 mt-4 font-semibold">
    Need Attention
  </p>
</div>

<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
  <h3 className="text-gray-500">Delivered Orders</h3>

  <p className="text-4xl font-bold mt-3 text-green-600">
    {deliveredOrders}
  </p>

  <p className="text-sm text-green-600 mt-4 font-semibold">
    Successfully Delivered
  </p>
</div>

<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
  <h3 className="text-gray-500">Revenue</h3>

  <p className="text-4xl font-bold mt-3 text-purple-600">
    ₹ {totalRevenue.toLocaleString()}
  </p>

  <p className="text-sm text-purple-600 mt-4 font-semibold">
    Delivered Orders
  </p>
</div>


            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
              <h3 className="text-gray-500">Best Sellers</h3>
              <p className="text-4xl font-bold mt-3 text-green-600">
                {bestSellers}
              </p>
              <p className="text-sm text-green-600 mt-4 font-semibold">
  View Best Sellers →
</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
              <h3 className="text-gray-500">Out of Stock</h3>
              <p className="text-4xl font-bold mt-3 text-red-600">
  {outOfStock}
</p>
<p className="text-sm text-red-600 mt-4 font-semibold">
  Restock Products →
</p>
            </div>

            

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
              <h3 className="text-gray-500">Categories</h3>
              <p className="text-4xl font-bold mt-3 text-yellow-500">
  {totalCategories}
</p>
<p className="text-sm text-yellow-600 mt-4 font-semibold">
  Manage Categories →
</p>
            </div>

        

          </div>

        </div>

      </div>

    </div>
  );
  <div className="mt-12">

  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Quick Actions
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 text-xl font-bold transition">
      ➕ Add Product
    </button>

    <button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-6 text-xl font-bold transition">
      📦 Manage Products
    </button>

    <button className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 text-xl font-bold transition">
      ❌ Out Of Stock
    </button>

  </div>

</div>
}

export default Dashboard;