import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateOrder = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === updatedOrder.id
          ? updatedOrder
          : order
      )
    );
  };

  const deleteOrder = (id) => {
    setOrders((prev) =>
      prev.filter((order) => order.id !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

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