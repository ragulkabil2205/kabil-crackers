import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
      
          <App />
          <ToastContainer
    position="top-right"
    autoClose={2000}
    theme="dark"
    newestOnTop
  />
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  </StrictMode>
);