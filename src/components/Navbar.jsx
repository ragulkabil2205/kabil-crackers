import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-blue-950 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/images/logo/logo.jpeg"
            alt="Logo"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
          />

          <div>
            <h1 className="text-sm sm:text-base md:text-3xl font-bold text-yellow-400 whitespace-nowrap">
              Kabil Crackers
            </h1>

            <p className="hidden md:block text-xs text-white">
              Premium Sivakasi Fireworks
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-yellow-400"
          >
            Products
          </Link>

          <Link
            to="/contact"
            className="hover:text-yellow-400"
          >
            Contact
          </Link>

          <a
            href="/pdf/Kabil-Crackers-Catalog.pdf"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400"
          >
            Catalog
          </a>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-5 text-white">

          <Link to="/wishlist" className="relative">
            <FaHeart
              size={22}
              className="hover:text-pink-400"
            />

            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <FaShoppingCart
              size={22}
              className="hover:text-yellow-400"
            />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

        </div>

        {/* Mobile Right */}
        <div className="flex md:hidden items-center gap-4">

          <Link
            to="/wishlist"
            className="relative text-white"
          >
            <FaHeart size={20} />

            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative text-white"
          >
            <FaShoppingCart size={20} />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
          >
            {menuOpen ? (
              <FaTimes size={22} />
            ) : (
              <FaBars size={22} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-900 px-6 py-5 space-y-4 text-white">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Products
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Contact
          </Link>

          <a
            href="/pdf/Kabil-Crackers-Catalog.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Catalog
          </a>

        </div>
      )}
    </header>
  );
}

export default Navbar;