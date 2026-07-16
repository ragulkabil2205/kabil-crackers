import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-6">
      <div className="bg-blue-900 p-10 rounded-3xl text-center max-w-lg shadow-2xl">

        <div className="text-7xl mb-5">🎉</div>

        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-300 mb-8">
          Thank you for shopping with
          <br />
          <span className="text-yellow-400 font-bold">
            Kabil Crackers
          </span>
        </p>

        <Link to="/">
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-300">
            Continue Shopping
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Success;
