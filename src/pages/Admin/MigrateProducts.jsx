import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import productsData from "../../data/products";

function MigrateProducts() {
  const migrate = async () => {
    const snapshot = await getDocs(collection(db, "products"));

    if (!snapshot.empty) {
      alert("Products already migrated!");
      return;
    }

    for (const product of productsData) {
      const { id, ...data } = product;
      await addDoc(collection(db, "products"), data);
    }

    alert("Migration Completed Successfully!");
  };

  const addStockField = async () => {
  const snapshot = await getDocs(collection(db, "products"));

  for (const document of snapshot.docs) {
    const data = document.data();

    if (data.stock === undefined) {
      await updateDoc(doc(db, "products", document.id), {
        stock: 100,
      });
    }
  }

  alert("✅ Stock field added successfully!");
};
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Firestore Migration
      </h1>

      <button
        onClick={migrate}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Upload Products to Firestore
      </button>

      <button
  onClick={addStockField}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
>
  Add Stock Field
</button>

    </div>
  );
}

export default MigrateProducts;