import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRef } from "react";
import toast from "react-hot-toast";


const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const firstLoad = useRef(true);

  const addOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

const updateOrder = async (updatedOrder) => {
  await updateDoc(
    doc(db, "orders", updatedOrder.firestoreId),
    {
      status: updatedOrder.status,
    }
  );

  setOrders((prev) =>
    prev.map((order) =>
      order.firestoreId === updatedOrder.firestoreId
        ? updatedOrder
        : order
    )
  );
};

  const deleteOrder = async (firestoreId) => {
  await deleteDoc(
    doc(db, "orders", firestoreId)
  );

  setOrders((prev) =>
    prev.filter(
      (order) =>
        order.firestoreId !== firestoreId
    )
  );
};

 

useEffect(() => {

  const unsubscribe = onSnapshot(
    collection(db, "orders"),
    (snapshot) => {

      const ordersData = snapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data(),
      }));

      if (!firstLoad.current) {

  if (ordersData.length > orders.length) {

    const latest =
      ordersData[ordersData.length - 1];

    toast.success(
      `🛒 New Order\n${latest.customer}\n₹${Number(
        latest.total || 0
      ).toLocaleString()}`
    );

  }

}

firstLoad.current = false;

setOrders(ordersData);

    }
  );

  return () => unsubscribe();

}, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}