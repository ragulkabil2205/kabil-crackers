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
          w-64 h-screen
          bg-black text-white p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-10">
          Kabil Admin
        </h2>

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
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;