import { GLOBAL_DISCOUNT } from "../data/products";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Products({
  searchTerm = "",
}) {
  const { products } = useProducts();
  console.log("Products:", products);
console.log("Count:", products.length);
const { addToCart } = useCart();
const { wishlistItems, addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const [addedItemId, setAddedItemId] = useState(null);
  

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());


    return matchesSearch ;
  });

 return (
  <>
    <section className="bg-blue-950 py-20">
      <div className="max-w-7xl mx-auto px-6">

       <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
  📦 Our Products
</h2>
        <p className="text-center text-gray-300 mb-10 text-lg">
  Showing{" "}
  <span className="text-yellow-400 font-bold">
    {filteredProducts.length}
  </span>{" "}
  Product{filteredProducts.length !== 1 ? "s" : ""}
</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">

          {filteredProducts.map((item) => {
  console.log(item.name, item.stock, typeof item.stock);

  return (
            
            <div
              key={item.id}
             className="bg-blue-900 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/40 transition-all duration-300"
            >

              <div className="relative">

             <img
  src={item.image}
  alt={item.name}
  loading="lazy"
  onClick={() => navigate(`/product/${item.id}`)}
  className="w-full h-36 md:h-56 object-cover cursor-pointer hover:scale-105 transition"
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
             
              <div className="p-3 md:p-5">

                <h3
  onClick={() => navigate(`/product/${item.id}`)}
  className="text-sm md:text-xl font-bold text-yellow-400 leading-tight cursor-pointer"
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

                  <span className="hidden md:inline text-gray-300 text-sm">
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

                  <p className="text-lg md:text-2xl font-bold text-yellow-400">
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
 className={`mt-2 w-full py-2 md:py-3 rounded-lg font-bold text-sm md:text-base ${
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
