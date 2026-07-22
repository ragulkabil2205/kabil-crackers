import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Admin/Login";
import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Sales from "./pages/Admin/Sales";
import MigrateProducts from "./pages/Admin/MigrateProducts";

function App() {
  return (
    <layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
  path="/admin/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
<Route path="/Admin/sales" element={<Sales />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
       <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
       <Route
  path="/admin/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
        <Route
  path="/admin/login"
  element={<Login />}
/>
<Route
  path="/admin/migrate"
  element={<MigrateProducts />}
/>
      </Routes>
       <FloatingWhatsApp />
       </layout>
  );
}

export default App;