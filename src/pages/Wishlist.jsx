import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-blue-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-pink-400 mb-8">
          ❤️ My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">

  <div className="text-7xl mb-6">
    ❤️
  </div>

  <h2 className="text-3xl font-bold text-pink-400">
    Your Wishlist is Empty
  </h2>

  <p className="text-gray-300 mt-4">
    Save your favourite crackers here.
  </p>

  <Link to="/products">
    <button className="mt-8 bg-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-600 transition">
      Explore Products
    </button>
  </Link>

</div>
        ) : (
          wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-blue-900 rounded-2xl p-6 mb-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    {item.name}
                  </h2>

                  <p className="text-gray-300">
                    ₹ {item.price}
                  </p>
                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => addToCart(item)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300"
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  ❌ Remove
                </button>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Wishlist;