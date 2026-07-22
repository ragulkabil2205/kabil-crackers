import { GLOBAL_DISCOUNT } from "../data/products";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Products({
  searchTerm = "",
  selectedCategory = "All",
}) {
  const { products } = useProducts();
const { addToCart } = useCart();
const { wishlistItems, addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const [addedItemId, setAddedItemId] = useState(null);
  

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

 return (
  <>
    <section className="bg-blue-950 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          ⭐ Best Selling Products
        </h2>
        <p className="text-center text-gray-300 mb-10 text-lg">
  Showing{" "}
  <span className="text-yellow-400 font-bold">
    {filteredProducts.length}
  </span>{" "}
  Product{filteredProducts.length !== 1 ? "s" : ""}
</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredProducts.map((item) => {
  console.log(item.name, item.stock, typeof item.stock);

  return (
            
            <div
              key={item.id}
             className="bg-blue-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-yellow-400/40 hover:-translate-y-2 hover:scale-105 transition-all duration-500"
            >

              <div className="relative">

             <img
  src={item.image}
  alt={item.name}
  loading="lazy"
  onClick={() => navigate(`/product/${item.id}`)}
  className="w-full h-56 object-cover transition-transform duration-500 cursor-pointer hover:scale-110 hover:rotate-1"
/>
{Number(item.stock) === 0 && (
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <span className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-lg tracking-wider">
      OUT OF STOCK
    </span>
  </div>
)}
<button
  onClick={() => addToWishlist(item)}
  className="absolute top-3 left-3 bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-20"
>
  {wishlistItems.some((wish) => wish.id === item.id) ? (
    <FaHeart className="text-xl text-red-500 animate-pulse" />
  ) : (
    <FaRegHeart className="text-xl text-pink-600" />
  )}
</button>
               {item.bestseller && (
  <div className="absolute top-3 left-16 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
    ⭐ Best Seller
  </div>
)}

                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  🔥{" "}
{Math.round(
  ((item.originalPrice - item.price) /
    item.originalPrice) *
    100
)}
% OFF
                </div>

              </div>
             
              <div className="p-5">

                <h3
  onClick={() => navigate(`/product/${item.id}`)}
  className="text-xl font-bold text-yellow-400 cursor-pointer hover:text-yellow-300"
>
  {item.name}
</h3>

<p className="text-white text-xs">
  Stock: {String(item.stock)}
</p>

                <div className="flex items-center gap-2 mt-2 text-yellow-300">

                  <FaStar />

                  <span className="font-semibold">
                    {item.rating}
                  </span>

                  <span className="text-gray-300 text-sm">
                    ({item.reviews} Reviews)
                  </span>

                </div>

                <div className="mt-3">

                {Number(item.stock || 0) > 0 ? (
  <p className="text-green-400 font-semibold">
    🟢 {item.stock} Available
  </p>
) : (
  <p className="text-red-500 font-semibold">
    🔴 Out of Stock
  </p>
)}

                  <p className="text-gray-400 line-through mt-3">
                    MRP ₹ {item.originalPrice}
                  </p>

                  <p className="text-2xl font-bold text-yellow-400">
                    Our Price ₹ {item.price}
                  </p>

                </div>
                  

                <button
  onClick={() => {
    addToCart(item);

    setAddedItemId(item.id);

    setTimeout(() => {
      setAddedItemId(null);
    }, 2000);
  }}
  disabled={Number(item.stock || 0) <= 0}
  className={`mt-3 w-full py-3 rounded-xl font-bold transition-all duration-300 ${
    Number(item.stock || 0) > 0
      ? addedItemId === item.id
        ? "bg-green-500 text-white"
        : "bg-yellow-400 text-black hover:bg-yellow-300"
      : "bg-gray-600 text-gray-300 cursor-not-allowed"
  }`}
>
  {Number(item.stock || 0) <= 0
    ? "Out of Stock"
    : addedItemId === item.id
    ? "✅ Added"
    : "🛒 Add to Cart"}
</button>

              </div>

            </div>
          );
})}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-white text-2xl font-bold py-10">
              😔 No Products Found
            </div>
          )}

               </div>
      </div>
    </section>


  </>
);
}

export default Products;
