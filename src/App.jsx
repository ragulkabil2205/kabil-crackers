import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Admin/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
//import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Sales from "./pages/Admin/Sales";
import MigrateProducts from "./pages/Admin/MigrateProducts";
import TrackOrder from "./pages/TrackOrder";
import Billing from "./pages/Admin/Billing";
import BillHistory from "./pages/Admin/BillHistory";


function App() {
  return (
    <Layout>
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/success" element={<Success />} />

  <Route path="/track-order" element={<TrackOrder />} />

  <Route
    path="/admin/sales"
    element={
      <ProtectedRoute>
        <Sales />
      </ProtectedRoute>
    }
  />


  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    
    <Route index element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<Orders />} />
    <Route path="billing" element={<Billing />} />
    <Route path="bill-history" element={<BillHistory />} />
  </Route>

  <Route path="/admin/login" element={<Login />} />
  <Route path="/admin/migrate" element={<MigrateProducts />} />
</Routes>

{/*<FloatingWhatsApp />*/}
    </Layout>
  );
}

export default App;