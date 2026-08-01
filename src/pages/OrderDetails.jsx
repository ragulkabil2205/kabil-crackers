import { useParams } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-blue-950 text-white py-10 px-6">

      <div className="max-w-5xl mx-auto bg-blue-900 rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          📦 Order Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-blue-800 rounded-xl p-5">
            <h2 className="text-xl font-bold mb-4">
              Customer Details
            </h2>

            <p>Name :</p>
            <p>Phone :</p>
            <p>Address :</p>
          </div>

          <div className="bg-blue-800 rounded-xl p-5">
            <h2 className="text-xl font-bold mb-4">
              Order Info
            </h2>

            <p>Order ID : {id}</p>

            <p>Status :</p>

            <p>Order Date :</p>

            <p>Delivery Date :</p>
          </div>

        </div>

        <div className="bg-blue-800 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            🛒 Ordered Products
          </h2>

          <p>Products will be displayed here...</p>

        </div>

        <div className="bg-blue-800 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            💰 Bill Summary
          </h2>

          <p>Subtotal :</p>

          <p>GST :</p>

          <p>Packing :</p>

          <p>Delivery :</p>

          <hr className="my-4" />

          <h2 className="text-2xl font-bold text-yellow-400">
            Grand Total :
          </h2>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;