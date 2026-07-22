import { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-blue-950 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">

        {/* Logo */}
        <Link
  to="/"
  className="flex items-center gap-2 flex-1 min-w-0"
>
         <img
  src="/images/logo/logo.jpeg"
  alt="Logo"
  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
/>

          <div>
            <h1 className="text-base sm:text-lg md:text-3xl font-bold text-yellow-400">
              Kabil Crackers
            </h1>

            <p className="hidden sm:block text-xs text-white">
              Premium Sivakasi Fireworks
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>

          <a
            href="/pdf/Kabil-Crackers-Catalog.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Catalog
          </a>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-5 text-white">

          <Link to="/wishlist" className="relative">
            <FaHeart size={22} />

            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <FaShoppingCart size={22} />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-3 shrink-0">

          <Link to="/wishlist" className="relative text-white">
            <FaHeart size={22} />

            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-white">
            <FaShoppingCart size={22} />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
          >
            {menuOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-900 text-white px-6 py-4 space-y-4">

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
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            Catalog
          </a>

        </div>
      )}
    </header>
  );
}

export default Navbar;