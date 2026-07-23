import { useEffect, useState } from "react";

function NewOrderNotification({ latestOrder }) {

  const [show, setShow] = useState(false);
useEffect(() => {

  if (!latestOrder) return;

  setShow(true);

  const audio = new Audio("/sounds/notification.mp3");

  audio.volume = 0.8;

  audio.play().catch(() => {});

  const timer = setTimeout(() => {

    setShow(false);

  }, 5000);

  return () => clearTimeout(timer);

}, [latestOrder]);
if (!show || !latestOrder) return null;

  return (

    <div className="fixed top-5 right-5 z-50 bg-green-600 text-white rounded-xl shadow-xl p-5 w-80 animate-bounce">

      <h2 className="font-bold text-lg">
        🔔 New Order Received
      </h2>

      <p className="mt-2">
        👤 {latestOrder.customer}
      </p>

      <p>
        💰 ₹{Number(latestOrder.total || 0).toLocaleString()}
      </p>

      <p className="text-sm mt-2">
        {latestOrder.orderDate}
      </p>

    </div>

  );

}

export default NewOrderNotification;