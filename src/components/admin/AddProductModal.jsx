import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";



function AddProductModal({
  isOpen,
  onClose,
  editProduct = null,
}) {
const {
  products,
  addProduct,
  updateProduct,
} = useProducts();

const [showToast, setShowToast] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  stock: "",
  description: "",
  rating: "",
  image: "",
  images: [],
  bestseller: false,
});
const [selectedImages, setSelectedImages] = useState([]);

useEffect(() => {
if (editProduct) {
  setFormData({
    name: editProduct.name || "",
    category: editProduct.category || "",
    price: editProduct.price || "",
    originalPrice: editProduct.originalPrice || "",
    stock: editProduct.stock || "",
    description: editProduct.description || "",
    rating: editProduct.rating || "",
    image: editProduct.image || "",
    images: editProduct.images || [editProduct.image],
    bestseller: editProduct.bestseller || false,
    
  });
}
  else {
setFormData({
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  stock: "",
  description: "",
  rating: "",
  image: "",
  images: [],
  bestseller: false,
});
setSelectedImages([]);
  }
}, [editProduct]);

const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "kabil_products");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/lpopjrns/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.secure_url;
};
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
const handleSave = async () => {
  console.log("EDIT PRODUCT =>", editProduct);
  console.log(editProduct);
  if (
  !formData.name ||
  !formData.category ||
  !formData.price ||
  !formData.originalPrice ||
  !formData.stock ||
  !formData.description
) {
  alert("Please fill all required fields.");
  return;
}
const duplicateProduct = products.find((product) => {
  const sameName =
    product.name.trim().toLowerCase() ===
    formData.name.trim().toLowerCase();

  // Edit mode-la current product-a ignore pannu
  if (editProduct) {
    return sameName && product.id !== editProduct.id;
  }

  return sameName;
});

if (duplicateProduct) {
  alert("❌ Product with this name already exists.");
  return;
}
// Upload all selected images
let imageUrls = formData.images || [];

// New images selected
if (selectedImages.length > 0) {
  imageUrls = [];

  for (const file of selectedImages) {
    const url = await uploadImage(file);
    imageUrls.push(url);
  }
}
const productData = {
  ...(editProduct && { id: editProduct.id }),

  name: formData.name,
  category: formData.category,
  price: Number(formData.price),
  originalPrice: Number(formData.originalPrice),
  stock: Number(formData.stock),
  description: formData.description,
  rating: Number(formData.rating),
  image: imageUrls[0],
images: imageUrls,
  bestseller: formData.bestseller,
};

 try {
  if (editProduct) {
    await updateProduct(productData);
  } else {
    await addProduct(productData);
  }

 
} catch (err) {
  console.error(err);
  alert(err.message);
}

  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);

   setFormData({
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  stock: "",
  description: "",
  rating: "",
  image: "",
images: [],
  bestseller: false,
});
setSelectedImages([]);
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
  name="originalPrice"
  value={formData.originalPrice}
  onChange={handleChange}
  placeholder="Original Price"
  className="border rounded-xl p-3"
/>

<input
  type="number"
  name="stock"
  value={formData.stock}
  onChange={handleChange}
  placeholder="Stock Quantity"
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

<textarea
  name="description"
  value={formData.description}
  onChange={handleChange}
  placeholder="Product Description"
  rows={4}
  className="border rounded-xl p-3 col-span-2 resize-none"
/>

       <div className="col-span-2">

  <label className="block font-semibold mb-2">
    Product Image
  </label>

  <input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length > 4) {
      alert("Maximum 4 images allowed.");
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        alert("Please select valid image files.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("Each image should be less than 10 MB.");
        return;
      }
    }

    setSelectedImages(files);

    setFormData((prev) => ({
      ...prev,
      images: files.map((file) => URL.createObjectURL(file)),
      image: URL.createObjectURL(files[0]), // Preview first image
    }));
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
  {editProduct
  ? "✅ Product Updated Successfully"
  : "✅ Product Added Successfully"}
  </div>
)}

  </>

);
}

export default AddProductModal;