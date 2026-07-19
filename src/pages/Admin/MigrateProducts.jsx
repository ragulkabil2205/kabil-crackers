import { collection, addDoc, getDocs } from "firebase/firestore";
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
    </div>
  );
}

export default MigrateProducts;