import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-black text-white p-4 shadow">
          <button
            onClick={() => setIsOpen(true)}
            className="text-2xl"
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

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;