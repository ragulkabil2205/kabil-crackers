import { Link } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-72 max-w-[85vw] h-screen
          bg-black text-white p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
       <div className="flex items-center justify-between mb-10">
  <h2 className="text-2xl font-bold text-yellow-400">
    Kabil Admin
  </h2>

  <button
    onClick={() => setIsOpen(false)}
    className="md:hidden text-3xl text-white hover:text-red-400"
  >
    ✕
  </button>
</div>

        <nav className="space-y-4">
          <Link
            to="/admin"
            onClick={closeSidebar}
            className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/admin/products"
            onClick={closeSidebar}
            className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
          >
            📦 Products
          </Link>

          <Link
            to="/admin/add-product"
            onClick={closeSidebar}
            className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
          >
            ➕ Add Product
          </Link>

          <Link
            to="/admin/orders"
            onClick={closeSidebar}
            className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
          >
            📋 Orders
          </Link>
          <Link
  to="/admin/billing"
  onClick={closeSidebar}
  className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
>
  🧾 Billing
</Link>

<Link
  to="/admin/bill-history"
  onClick={closeSidebar}
  className="block bg-gray-800 hover:bg-yellow-400 hover:text-black px-4 py-3 rounded-lg transition"
>
  📜 Bill History
</Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;