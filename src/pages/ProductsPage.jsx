import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import Products from "../components/Products";

function ProductsPage() {
  return (
    <div className="bg-blue-950 min-h-screen">

      <div className="py-12 text-center">
        <h1 className="text-5xl font-bold text-yellow-400">
          Our Products
        </h1>

        <p className="text-gray-300 mt-4">
          Explore Premium Sivakasi Crackers
        </p>
      </div>

      <SearchBar />
      <Categories />
      <Products />

    </div>
  );
}

export default ProductsPage;
