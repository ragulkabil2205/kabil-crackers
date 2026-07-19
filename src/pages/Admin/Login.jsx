import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(email, password);

    if (success) {
      navigate("/admin");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-black">

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          🔐 Admin Login
        </h1>

        <input
  type="email"
  placeholder="Admin Email"
  className="w-full border rounded-xl p-3 mb-4"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl p-3 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;