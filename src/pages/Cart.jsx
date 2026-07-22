import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalMRP = cartItems.reduce(
  (total, item) =>
    total + item.originalPrice * item.quantity,
  0
);

const totalSaved = totalMRP - totalPrice;
  const discount = totalPrice > 5000 ? 500 : 0;

const delivery = totalPrice > 1000 ? 0 : 100;

const grandTotal = totalPrice - discount + delivery;

  return (
    <div className="min-h-screen bg-blue-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          🛒 Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">

  <div className="text-7xl mb-6">
    🛒
  </div>

  <h2 className="text-3xl font-bold text-yellow-400">
    Your Cart is Empty
  </h2>

  <p className="text-gray-300 mt-4">
    Looks like you haven't added any crackers yet.
  </p>

  <Link to="/products">
    <button className="mt-8 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition">
      Continue Shopping
    </button>
  </Link>

</div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-blue-900 rounded-2xl p-6 mb-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-5">

                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-yellow-400">
                      {item.name}
                    </h2>

                    <p className="text-gray-300 mt-1">
                      ₹ {item.price}
                    </p>

                    <p className="mt-2">
                      Subtotal :
                      <span className="text-yellow-400 font-bold">
                        {" "}₹ {item.price * item.quantity}
                      </span>
                    </p>
                  </div>

                </div>

                <div className="flex flex-col items-center gap-4">

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-red-500 px-3 py-1 rounded-lg text-xl"
                    >
                      −
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-green-500 px-3 py-1 rounded-lg text-xl"
                    >
                      +
                    </button>

                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>
            ))}

            <div className="bg-yellow-400 text-black rounded-2xl p-6 mt-10">

              <h2 className="text-3xl font-bold">
                Order Summary
              </h2>

              <div className="flex justify-between mt-4 text-xl">
                <span>Total Items</span>
                <span>{cartItems.length}</span>
              </div>

             <div className="flex justify-between mt-2 text-xl">
  <span>MRP Total</span>

  <span className="line-through text-gray-700">
    ₹ {totalMRP.toLocaleString()}
  </span>
</div>

<div className="flex justify-between mt-2 text-xl text-green-700 font-bold">
  <span>Discount Saved</span>

  <span>
    ₹ {totalSaved.toLocaleString()}
  </span>
</div>

<hr className="my-4 border-yellow-600" />

<div className="flex justify-between text-2xl font-bold">
  <span>You Pay</span>

  <span>
    ₹ {totalPrice.toLocaleString()}
  </span>
</div>

<p className="mt-4 text-center text-green-700 font-bold text-lg">
  🎉 Congratulations! You Saved ₹
  {totalSaved.toLocaleString()}
</p>
              <div className="flex justify-between mt-2 text-xl">
  <span>Discount</span>
  <span className="text-green-600 font-bold">
    - ₹ {discount}
  </span>
</div>

<div className="flex justify-between mt-2 text-xl">
  <span>Delivery</span>
  <span className="font-bold">
    {delivery === 0 ? "FREE" : `₹ ${delivery}`}
  </span>
</div>

<hr className="my-4 border-gray-500" />

<div className="flex justify-between text-2xl font-bold">
  <span>Grand Total</span>
  <span>
    ₹ {grandTotal}
  </span>
</div>

            <button
  onClick={() => {
    const insufficient = cartItems.find(
      (item) => item.quantity > Number(item.stock || 0)
    );

    if (insufficient) {
      alert(
        `${insufficient.name} has only ${insufficient.stock} items available.`
      );
      return;
    }

    navigate("/checkout");
  }}
  className="mt-6 w-full bg-blue-950 text-white py-4 rounded-xl font-bold hover:bg-blue-900"
>
  Proceed to Checkout
</button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;