import products from "../data/products";
import { useCart } from "../context/CartContext";
import { GLOBAL_DISCOUNT } from "../data/products";

function FeaturedProducts() {
  const { addToCart } = useCart();

  const featured = products.slice(0, 4);

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          🔥 Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-blue-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-400/30 hover:scale-105 duration-300"
            >
              <div className="relative">

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
    🔥 {GLOBAL_DISCOUNT}% OFF
  </div>

  <div className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
    ⭐ Featured
  </div>

</div>


              <div className="p-5">

                <h3 className="text-xl font-bold text-yellow-400">
                  {item.name}
                </h3>

                <p className="text-gray-400 line-through mt-3">
  MRP ₹ {item.originalPrice}
</p>

<p className="text-2xl font-bold text-yellow-400">
  Our Price ₹ {item.price}
</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-5 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300"
                >
                  🛒 Add to Cart
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;