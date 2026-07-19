import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };
  return (
    <header className="h-20 bg-white shadow-md flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Manage your Kabil Crackers store
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="text-right">
          <p className="font-semibold text-gray-800">
            Ragul Kabil
          </p>

          <p className="text-sm text-gray-500">
            Administrator
          </p>
        </div>

        <button
  onClick={handleLogout}
  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold transition"
>
  🚪 Logout
</button>

        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-lg">
          RK
        </div>

      </div>

    </header>
  );
}

export default Topbar;