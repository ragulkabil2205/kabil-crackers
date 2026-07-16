import { FaTimes, FaStar } from "react-icons/fa";

function QuickViewModal({
  product,
  isOpen,
  onClose,
  addToCart,
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-blue-900 rounded-2xl w-[90%] max-w-3xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 text-2xl"
        >
          <FaTimes />
        </button>

        <div className="grid md:grid-cols-2 gap-8">

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl"
          />

          <div>

            <h2 className="text-3xl font-bold text-yellow-400">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-4 text-yellow-300">
              <FaStar />
              <span>{product.rating}</span>
              <span className="text-gray-300">
                ({product.reviews} Reviews)
              </span>
            </div>

            <p className="text-green-400 mt-4 font-semibold">
              🟢 In Stock
            </p>

            <p className="text-gray-400 line-through mt-4">
              MRP ₹ {product.originalPrice}
            </p>

            <p className="text-3xl text-yellow-400 font-bold">
              Our Price ₹ {product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-8 w-full bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300"
            >
              🛒 Add to Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default QuickViewModal;