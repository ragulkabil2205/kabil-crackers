import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-black text-white px-4 py-3 shadow-lg">
          <button
            onClick={() => setIsOpen(true)}
            className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition"
          >
            ☰
          </button>

          <h1 className="text-lg font-bold text-yellow-400">
            Kabil Admin
          </h1>

          <div className="w-6" />
        </header>

        {/* Desktop Topbar */}
        <div className="hidden md:block">
          <Topbar />
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;