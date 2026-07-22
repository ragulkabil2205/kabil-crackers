import { createContext, useContext, useState, useEffect } from "react";

import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  runTransaction,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const ProductsContext = createContext();
const productsCollection = collection(db, "products");

export function ProductsProvider({ children }) {
 const [products, setProducts] = useState([]);

 const addProduct = async (newProduct) => {
  await addDoc(productsCollection, newProduct);
};

 const updateProduct = async (updatedProduct) => {
  const { id, ...data } = updatedProduct;

  await updateDoc(doc(db, "products", id), data);
};

  const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};

const reduceStock = async (productId, quantity) => {
  const productRef = doc(db, "products", productId);

  try {
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error("Product not found");
      }

      const currentStock = Number(productDoc.data().stock || 0);

      if (currentStock < quantity) {
        throw new Error("Insufficient stock");
      }

      transaction.update(productRef, {
        stock: currentStock - quantity,
      });
    });

    return true;
  } catch (error) {
    alert(error.message);
    return false;
  }
};

useEffect(() => {
  const unsubscribe = onSnapshot(
    productsCollection,
    (snapshot) => {
      const firebaseProducts = snapshot.docs.map((doc) => ({
  ...doc.data(),
  id: doc.id,
}));

      setProducts(firebaseProducts);
    }
  );

  return () => unsubscribe();
}, []);

  return (
    <ProductsContext.Provider
      value={{
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  reduceStock,
}}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}