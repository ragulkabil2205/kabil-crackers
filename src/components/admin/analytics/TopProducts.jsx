function TopProducts({ topProducts }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

      <h2 className="text-2xl font-bold mb-6">
        🏆 Top Selling Products
      </h2>

      <div className="space-y-4">

        {topProducts.length === 0 ? (

          <p className="text-gray-500">
            No Delivered Orders Yet
          </p>

        ) : (

          topProducts.map((product, index) => (

            <div
              key={product.name}
              className="flex justify-between items-center border-b pb-3"
            >

              <div className="flex items-center gap-3">

                <span className="text-2xl">

                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : "🏅"}

                </span>

                <span className="font-semibold">
                  {product.name}
                </span>

              </div>

              <span className="font-bold text-blue-600">
                {product.qty} pcs
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default TopProducts;