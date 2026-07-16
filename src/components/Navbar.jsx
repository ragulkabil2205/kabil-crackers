import { FaShoppingCart, FaHeart, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  return (
    <header className="sticky top-0 z-50 bg-blue-950/90 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
    <div className="flex items-center gap-3">
  <img
    src="/images/logo/logo.jpeg"
    alt="Kabil Crackers Logo"
    className="w-14 h-14 object-contain"
  />

  <div>
    <h1 className="text-3xl font-bold text-yellow-400">
      Kabil Crackers
    </h1>

    <p className="text-xs text-gray-300">
      Premium Sivakasi Fireworks
    </p>
  </div>
  </div>


        {/* Menu */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/" className="hover:text-yellow-400">
  Home
</Link>
          <Link to="/products" className="hover:text-yellow-400">
  Products
</Link>
          <Link to="/contact" className="hover:text-yellow-400">
  Contact
</Link>
<a
  href="/pdf/Kabil-Crackers-Catalog.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-yellow-400"
>
  Catalog
</a>
          
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-xl text-white">
  <Link to="/wishlist" className="relative">
  <FaHeart className="cursor-pointer hover:text-pink-400 text-2xl" />

  {wishlistItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {wishlistItems.length}
    </span>
  )}
</Link>

 <Link to="/cart" className="relative">
  <FaShoppingCart className="cursor-pointer hover:text-yellow-400 text-2xl" />

  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {cartItems.length}
    </span>
  )}
</Link>

  <FaBars className="md:hidden cursor-pointer" />
</div>

      </div>
    </header>
  );
  
}

export default Navbar;