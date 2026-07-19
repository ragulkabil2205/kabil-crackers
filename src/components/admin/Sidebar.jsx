import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6">

      <h2 className="text-2xl font-bold text-yellow-400 mb-10">
        Kabil Admin
      </h2>

      <nav className="space-y-4">

        <Link
          to="/admin"
          className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
        >
          📦 Products
        </Link>

        <Link
          to="/admin/add-product"
          className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
        >
          ➕ Add Product
        </Link>

        <Link
  to="/admin/orders"
  className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
>
  📋 Orders
</Link>

      </nav>

    </aside>
  );
}

export default Sidebar;