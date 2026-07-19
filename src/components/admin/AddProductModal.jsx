import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";

function AddProductModal({
  isOpen,
  onClose,
  editProduct = null,
}) {
const { addProduct, updateProduct } = useProducts();

const [showToast, setShowToast] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  category: "",
  price: "",
  rating: "",
  image: "",
  inStock: true,
  bestseller: false,
});
useEffect(() => {
  if (editProduct) {
    setFormData({
      name: editProduct.name,
      category: editProduct.category,
      price: editProduct.price,
      rating: editProduct.rating,
      image: editProduct.image,
      inStock: editProduct.inStock,
      bestseller: editProduct.bestseller,
    });
  } else {
    setFormData({
      name: "",
      category: "",
      price: "",
      rating: "",
      image: "",
      inStock: true,
      bestseller: false,
    });
  }
}, [editProduct]);
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
const handleSave = () => {
  if (
    !formData.name ||
    !formData.category ||
    !formData.price
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const productData = {
    id: editProduct ? editProduct.id : Date.now(),
    name: formData.name,
    category: formData.category,
    price: Number(formData.price),
    rating: Number(formData.rating),
    image: formData.image,
    inStock: formData.inStock,
    bestseller: formData.bestseller,
  };

  if (editProduct) {
    updateProduct(productData);
  } else {
    addProduct(productData);
  }

  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);

    setFormData({
      name: "",
      category: "",
      price: "",
      rating: "",
      image: "",
      inStock: true,
      bestseller: false,
    });

    onClose();
  }, 2000);
};
  if (!isOpen) return null;

  return (
<>

      <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
  {editProduct ? "✏️ Edit Product" : "➕ Add New Product"}
</h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-600"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 gap-4">
<input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Product Name"
  className="border rounded-xl p-3"
/>

         <input
  type="text"
  name="category"
  value={formData.category}
  onChange={handleChange}
  placeholder="Category"
  className="border rounded-xl p-3"
/>

         <input
  type="number"
  name="price"
  value={formData.price}
  onChange={handleChange}
  placeholder="Price"
  className="border rounded-xl p-3"
/>


          <input
  type="number"
  step="0.1"
  name="rating"
  value={formData.rating}
  onChange={handleChange}
  placeholder="Rating"
  className="border rounded-xl p-3"
/>

       <div className="col-span-2">

  <label className="block font-semibold mb-2">
    Product Image
  </label>

  <input
    type="file"
    accept="image/*"
onChange={(e) => {
  const file = e.target.files[0];

  if (!file) return;

  // Allow only image files
  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image.");
    return;
  }

  // Max 2 MB
 if (file.size > 10 * 1024 * 1024) {
  alert("Image size should be less than 10 MB.");
  return;
}

  const reader = new FileReader();

  reader.onloadend = () => {
    setFormData((prev) => ({
      ...prev,
      image: reader.result,
    }));
  };

  reader.readAsDataURL(file);
}}
    className="w-full border rounded-xl p-3"
  />

</div>
{formData.image && (

  <div className="col-span-2">

    <img
      src={formData.image}
      alt="Preview"
      className="w-36 h-36 object-cover rounded-xl border"
    />

  </div>

)}

<div className="col-span-2 flex gap-8">

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="inStock"
      checked={formData.inStock}
      onChange={handleChange}
    />

    In Stock

  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="bestseller"
      checked={formData.bestseller}
      onChange={handleChange}
    />

    Best Seller

  </label>

</div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

       <button
  onClick={handleSave}
  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
>
  {editProduct ? "Update Product" : "Save Product"}
</button>

        </div>

      </div>
      {showToast && (
  <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl z-[9999] animate-pulse">
    ✅ Product Added Successfully
  </div>
)}

  </>

);
}

export default AddProductModal;