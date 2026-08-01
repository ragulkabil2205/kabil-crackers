import { lazy, Suspense } from "react";
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
import TrackOrder from "./pages/TrackOrder";
import OrderDetails from "./pages/OrderDetails";


const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Products = lazy(() => import("./pages/Admin/Products"));
const Orders = lazy(() => import("./pages/Admin/Orders"));
const Sales = lazy(() => import("./pages/Admin/Sales"));
const Billing = lazy(() => import("./pages/Admin/Billing"));
const BillHistory = lazy(() => import("./pages/Admin/BillHistory"));
const MigrateProducts = lazy(() => import("./pages/Admin/MigrateProducts"));


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
  path="/order/:id"
  element={<OrderDetails />}
/>

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
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading Admin...
          </div>
        }
      >
        <AdminLayout />
      </Suspense>
    </ProtectedRoute>
  }
>
    
    <Route
  index
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  }
/>
    <Route
  path="products"
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  }
/>
   <Route
  path="orders"
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <Orders />
    </Suspense>
  }
/>
    <Route

  path="billing"

  element={

    <Suspense fallback={<div>Loading...</div>}>

      <Billing />

    </Suspense>

  }

/>
    <Route

  path="bill-history"

  element={

    <Suspense fallback={<div>Loading...</div>}>

      <BillHistory />

    </Suspense>

  }


/>



  </Route>

  <Route path="/admin/login" element={<Login />} />
  <Route path="/admin/migrate" element={<MigrateProducts />} />
</Routes>

{/*<FloatingWhatsApp />*/}
    </Layout>
  );
}

export default App;