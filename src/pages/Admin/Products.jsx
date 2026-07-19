import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useProducts } from "../../context/ProductsContext";
import { useEffect, useState } from "react";
import AddProductModal from "../../components/admin/AddProductModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

function Products() {
  const { products, deleteProduct } = useProducts();
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const [currentPage, setCurrentPage] = useState(1);
const [deleteModalOpen, setDeleteModalOpen] = useState(false);

const [selectedProduct, setSelectedProduct] = useState(null);

const [isModalOpen, setIsModalOpen] = useState(false);
const [editingProduct, setEditingProduct] = useState(null);
    

  

const productsPerPage = 10;

const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
const categories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

const currentProducts = filteredProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, selectedCategory]);

const openDeleteModal = (product) => {
  setSelectedProduct(product);
  setDeleteModalOpen(true);
};

const handleDelete = () => {
  deleteProduct(selectedProduct.id);

  setDeleteModalOpen(false);
  setSelectedProduct(null);
};

const handleEdit = (product) => {
  setEditingProduct(product);
  setIsModalOpen(true);
};

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <h2 className="text-3xl font-bold text-gray-800">
            📦 Products Management
          </h2>

          <p className="text-gray-500 mt-2">
            Manage all your cracker products.
          </p>

        <div className="mt-6 flex flex-col lg:flex-row justify-between items-center gap-4">

  <input
    type="text"
    placeholder="🔍 Search Product..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
<button
  onClick={() => setIsModalOpen(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
>
  ➕ Add Product
</button>
</div>

          <div className="bg-white rounded-2xl shadow-lg mt-8 overflow-hidden">

            <table className="w-full">

              <thead className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

                <tr>

                  <th className="p-4 text-left">Image</th>

                  <th className="p-4 text-left">Product</th>

                  <th className="p-4 text-left">Category</th>

                  <th className="p-4 text-left">Price</th>

                  <th className="p-4 text-left">Stock</th>

                  <th className="p-4 text-left">Rating</th>

                  <th className="p-4 text-left">Best Seller</th>

                  <th className="p-4 text-center">Actions</th>

                </tr>

              </thead>

              <tbody>

  {currentProducts.map((product) => (

   <tr
  key={product.id}
  className="border-b hover:bg-blue-50 transition-all duration-200"
>

      <td className="p-4">

       <img
  src={product.image}
  alt={product.name}
  className="w-16 h-16 object-cover rounded-xl border-2 border-gray-200 shadow-md hover:scale-110 transition duration-300"
/>

      </td>

      <td className="p-4 font-semibold">
        {product.name}
      </td>

      <td className="p-4">
        {product.category}
      </td>

      <td className="p-4">
        ₹ {product.price}
      </td>

      <td className="p-4">

  {product.inStock ? (

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
      🟢 In Stock
    </span>

  ) : (

    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
      🔴 Out of Stock
    </span>

  )}

</td>

      <td className="p-4">
        ⭐ {product.rating}
      </td>

      <td className="p-4">

  {product.bestseller ? (

    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
      ⭐ Best Seller
    </span>

  ) : (

    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
      ➖ Normal
    </span>

  )}

</td>

     <td className="p-4">

  <div className="flex justify-center gap-2">

 <button
  onClick={() => handleEdit(product)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
>
  ✏️ Edit
</button>

  <button
    onClick={() => openDeleteModal(product)}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
  >
    🗑 Delete
  </button>

</div>

</td>

    </tr>

  ))}

</tbody>

            </table>
            <div className="flex justify-center items-center gap-2 p-6">

  <button
    onClick={() =>
      setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
    disabled={currentPage === 1}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:bg-gray-400 transition"
  >
    ← Prev
  </button>

  <span className="font-semibold">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages || totalPages === 0}
    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
  >
    Next →
  </button>

</div>

          </div>

        </div>

      </div>
<AddProductModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditingProduct(null);
  }}
  editProduct={editingProduct}
/>

<DeleteConfirmModal
  isOpen={deleteModalOpen}
  onClose={() => {
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  }}
  onConfirm={handleDelete}
  productName={selectedProduct?.name}
/>
    </div>
  );
}

export default Products;