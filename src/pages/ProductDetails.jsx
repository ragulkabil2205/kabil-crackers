import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const product = products.find(
  (item) => item.id === id
);

  if (!product) {
    return (
      <h1 className="text-white text-center mt-20 text-4xl">
        Product Not Found
      </h1>
    );
  }

  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.image
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);

  const [allReviews, setAllReviews] = useState(
    product.reviewsData || []
  );

  const submitReview = () => {
    if (
      reviewName.trim() === "" ||
      reviewText.trim() === "" ||
      userRating === 0
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewName,
      rating: userRating,
      review: reviewText,
      date: new Date().toLocaleDateString(),
    };

    setAllReviews((prev) => [newReview, ...prev]);

    setReviewName("");
    setReviewText("");
    setUserRating(0);

    if (!toast.isActive("review-success")) {
      toast.success("⭐ Review Submitted Successfully!", {
        toastId: "review-success",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen text-white py-16">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

        {/* Product Images */}

        <div>

          <div className="bg-white rounded-2xl overflow-hidden group">

            <AnimatePresence mode="wait">

              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-[450px] object-cover group-hover:scale-110 transition duration-500"
              />

            </AnimatePresence>

          </div>

          <div className="flex gap-3 mt-4">

            {product.images?.map((img, index) => (

              <img
                key={index}
                src={img}
                alt=""
                loading="lazy"
                onClick={() => {
                  setSelectedImage(img);
                  setSelectedIndex(index);
                }}
                className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 transition-all duration-300 ${
                  selectedIndex === index
                    ? "border-yellow-400 scale-110"
                    : "border-transparent hover:border-gray-400"
                }`}
              />

            ))}

          </div>

        </div>

        {/* Product Details */}

        <div>

          <h1 className="text-5xl font-bold text-yellow-400">
            {product.name}
          </h1>

          <div className="mt-4">

            <p className="text-gray-400 line-through text-xl">
              MRP ₹ {product.originalPrice}
            </p>

            <p className="text-3xl font-bold text-yellow-400">
              Our Price ₹ {product.price}
            </p>

            <p className="text-xl font-semibold text-green-400 mt-2">
              Total : ₹ {(product.price * quantity).toLocaleString()}
            </p>

          </div>
                    <div className="mt-6 space-y-3">

            <p className="text-yellow-300 text-lg">
              ⭐ {product.rating} ({product.reviews} Reviews)
            </p>

            <p
  className={`font-semibold ${
    Number(product.stock || 0) > 0
      ? "text-green-400"
      : "text-red-500"
  }`}
>
  {Number(product.stock || 0) > 0
    ? `🟢 ${product.stock} Available`
    : "🔴 Out of Stock"}
</p>

            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full font-bold">
              🔥 90% OFF
            </div>

          </div>

          {/* Quantity */}

          <div className="mt-8">

            <h3 className="text-xl font-bold mb-4">
              Quantity
            </h3>

            <div className="flex items-center gap-5">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
                className="w-12 h-12 bg-red-600 rounded-xl text-2xl font-bold hover:bg-red-700"
              >
                -
              </button>

              <span className="text-3xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="w-12 h-12 bg-green-600 rounded-xl text-2xl font-bold hover:bg-green-700"
              >
                +
              </button>

            </div>

          </div>

          <p className="mt-8 text-gray-300 leading-8">
            Premium quality Sivakasi crackers with
            high performance, attractive effects
            and safe manufacturing standards.
            Perfect for Diwali celebrations.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <button
              onClick={() => addToWishlist(product)}
              className="bg-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-600 duration-300"
            >
              ❤️ Add to Wishlist
            </button>

            <button
              onClick={() =>
                addToCart({
                  ...product,
                  quantity,
                })
              }
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 duration-300"
            >
              🛒 Add to Cart
            </button>

            <button
  onClick={async () => {
    const shareData = {
      title: product.name,
      text: `🎆 Check out this product: ${product.name}\n💰 Price: ₹${product.price}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("🔗 Product link copied!");
    }
  }}
  className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 duration-300"
>
  📤 Share Product
</button>

            <button
              onClick={() => {

                const message = `Hi Kabil Crackers 👋

I want to order:

🎆 Product : ${product.name}

📦 Quantity : ${quantity}

💰 Total : ₹${product.price * quantity}`;

                window.open(
                  `https://wa.me/918428902102?text=${encodeURIComponent(message)}`,
                  "_blank"
                );

              }}
              className="bg-green-500 px-8 py-4 rounded-xl font-bold hover:bg-green-600 duration-300"
            >
            
              
              📲 WhatsApp Order
            </button>

            <a
              href="tel:+918428902102"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 duration-300"
            >
              📞 Call
            </a>

          </div>

        </div>

      </div>
            {/* Customer Reviews */}

      <div className="max-w-6xl mx-auto px-6 mt-20">

        <h2 className="text-3xl font-bold text-yellow-400 mb-8">
          ⭐ Customer Reviews
        </h2>

        <div className="space-y-6">

          {allReviews.map((review) => (

            <div
              key={review.id}
              className="bg-blue-900 rounded-2xl p-6 shadow-lg"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-bold">
                    {review.name}
                  </h3>

                  <p className="text-green-400 text-sm">
                    ✔ Verified Purchase
                  </p>

                </div>

                <p className="text-gray-400 text-sm">
                  {review.date}
                </p>

              </div>

              <div className="mt-3 text-yellow-400 text-lg">
                {"⭐".repeat(review.rating)}
              </div>

              <p className="mt-4 text-gray-300 leading-7">
                {review.review}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Write Review */}

      <div className="max-w-6xl mx-auto px-6 mt-20">

        <h2 className="text-3xl font-bold text-yellow-400 mb-8">
          ✍ Write a Review
        </h2>

        <div className="bg-blue-900 rounded-2xl p-8">

          <input
            type="text"
            placeholder="Your Name"
            value={reviewName}
            onChange={(e) =>
              setReviewName(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-blue-800 mb-5 outline-none"
          />

          <div className="flex gap-2 mb-5">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                type="button"
                onClick={() => setUserRating(star)}
                className="text-3xl"
              >
                {star <= userRating ? "⭐" : "☆"}
              </button>

            ))}

          </div>

          <textarea
            rows="5"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-blue-800 outline-none"
          />

          <button
            onClick={submitReview}
            className="mt-6 bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-300"
          >
            Submit Review
          </button>

        </div>

      </div>

      {/* Related Products */}

      <div className="max-w-6xl mx-auto px-6 mt-20">

        <h2 className="text-3xl font-bold text-yellow-400 mb-8">
          🔥 Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {relatedProducts.map((item) => (

            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="bg-blue-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 duration-300"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h3 className="text-yellow-400 font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-gray-400 line-through">
                  ₹ {item.originalPrice}
                </p>

                <p className="text-2xl font-bold">
                  ₹ {item.price}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;