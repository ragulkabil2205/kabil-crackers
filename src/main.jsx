import { AuthProvider } from "./context/AuthContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import "./index.css";
import App from "./App";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { ProductsProvider } from "./context/ProductsContext";
import { ToastProvider } from "./context/ToastContext";
import { OrdersProvider } from "./context/OrdersContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <ProductsProvider>
      <OrdersProvider>
  <ToastProvider>
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  </ToastProvider>
  </OrdersProvider>
</ProductsProvider>
</AuthProvider>
  </StrictMode>
);