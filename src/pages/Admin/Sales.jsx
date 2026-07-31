
import { useState } from "react";
import { useOrders } from "../../context/OrdersContext";




import { saveAs } from "file-saver";
import RevenueCards from "../../components/admin/analytics/RevenueCards";
import StatisticsCards from "../../components/admin/analytics/StatisticsCards";
import WeeklyChart from "../../components/admin/analytics/WeeklyChart";
import MonthlyChart from "../../components/admin/analytics/MonthlyChart";
import RecentActivity from "../../components/admin/analytics/RecentActivity";
import StatusPieChart from "../../components/admin/analytics/StatusPieChart";
import TopProducts from "../../components/admin/analytics/TopProducts";
import PaymentPieChart from "../../components/admin/analytics/PaymentPieChart";


function Sales() {
  const { orders } = useOrders();
  const [dateFilter, setDateFilter] = useState("all");
  const filteredOrders = orders.filter((order) => {
  if (!order.orderDate) return false;

  const orderDate = new Date(order.orderDate);
  const today = new Date();

  switch (dateFilter) {

    case "all":
  return true;


    case "today":
      return orderDate.toDateString() === today.toDateString();

    case "7days": {
      const last7 = new Date();
      last7.setDate(today.getDate() - 6);
      return orderDate >= last7;
    }

    case "30days": {
      const last30 = new Date();
      last30.setDate(today.getDate() - 29);
      return orderDate >= last30;
    }

    case "month":
      return (
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );

    default:
      return true;
  }
});
  orders.forEach((order) => {
  console.log("Payment:", order.payment);
});
  console.log("Orders Data:", orders);
console.log("First Order:", orders[0]);

  console.log("Orders:", orders);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weekData = days.map((day) => ({
    day,
    sales: 0,
  }));

  const today = new Date();

 // Today's / Weekly / Monthly Revenue
const todayRevenue = filteredOrders
  .filter((order) => {
    if (order.status !== "Delivered") return false;
    const d = new Date(order.orderDate);
    return d.toDateString() === today.toDateString();
  })
  .reduce((sum, order) => sum + Number(order.total || 0), 0);

const weeklyRevenue = filteredOrders
  .filter((order) => {
    if (order.status !== "Delivered") return false;

    const d = new Date(order.orderDate);
    const last7 = new Date();
    last7.setDate(today.getDate() - 6);

    return d >= last7;
  })
  .reduce((sum, order) => sum + Number(order.total || 0), 0);

const monthlyRevenue = filteredOrders
  .filter((order) => {
    if (order.status !== "Delivered") return false;

    const d = new Date(order.orderDate);

    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  })
  .reduce((sum, order) => sum + Number(order.total || 0), 0);
    const totalOrders = filteredOrders.length;

const pendingOrders = filteredOrders.filter(
  (order) => order.status === "Pending"
).length;

const processingOrders = filteredOrders.filter(
  (order) => order.status === "Processing"
).length;

const deliveredOrders = filteredOrders.filter(
  (order) => order.status === "Delivered"
).length;

const recentOrders = [...filteredOrders]
  .sort(
    (a, b) =>
      new Date(b.orderDate) - new Date(a.orderDate)
  )
  .slice(0, 5);

  const statusData = [
  {
    name: "Pending",
    value: pendingOrders,
  },
  {
    name: "Processing",
    value: processingOrders,
  },
  {
    name: "Delivered",
    value: deliveredOrders,
  },
];

const COLORS = [
  "#facc15", // Yellow
  "#2563eb", // Blue
  "#16a34a", // Green
];

console.log(
  "All Payment Values:",
  orders.map((o) => o.payment)
);
const paymentData = [
  {
    name: "Cash",
    value: orders.filter((order) =>
      ["Cash", "Cash on Delivery"].includes(order.payment)
    ).length,
  },
  {
    name: "UPI",
    value: orders.filter((order) =>
      ["UPI", "Online Payment"].includes(order.payment)
    ).length,
  },
  {
    name: "Card",
    value: orders.filter((order) => order.payment === "Card").length,
  },
];
const exportToExcel = async () => {
  const XLSX = await import("xlsx");
  const reportData = orders.map((order) => ({
    "Order ID": order.id,
    Customer: order.customer,
    Phone: order.phone,
    Status: order.status,
    Payment: order.payment,
    Total: Number(order.total || 0),
    Date: order.orderDate,
  }));

  const worksheet =
    XLSX.utils.json_to_sheet(reportData);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Sales Report"
  );

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  const file = new Blob(
    [excelBuffer],
    {
      type: "application/octet-stream",
    }
  );

  saveAs(
    file,
    `Kabil_Crackers_Report.xlsx`
  );
};

const productSales = {};

filteredOrders.forEach((order) => {
  if (order.status !== "Delivered") return;

  order.items?.forEach((item) => {
    if (!productSales[item.name]) {
      productSales[item.name] = 0;
    }

    productSales[item.name] += Number(item.quantity || 0);
  });
});

const topProducts = Object.entries(productSales)
  .map(([name, qty]) => ({
    name,
    qty,
  }))
  .sort((a, b) => b.qty - a.qty)
  .slice(0, 5);

  // Weekly Graph Data
  filteredOrders.forEach((order) => {
  if (order.status !== "Delivered") return;

  const date = new Date(order.orderDate);

    if (isNaN(date.getTime())) return;

    const dayIndex = date.getDay();

    weekData[dayIndex].sales += Number(order.total || 0);
  });

  // Weekly Revenue

  const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthData = monthNames.map((month) => ({
  month,
  sales: 0,
}));

filteredOrders.forEach((order) => {
  if (order.status !== "Delivered") return;

  const date = new Date(order.orderDate);

  if (isNaN(date.getTime())) return;

  const monthIndex = date.getMonth();

  monthData[monthIndex].sales += Number(order.total || 0);
});

  return (
  <>
    <div className="p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            📊 Sales Analytics
          </h1>

          <p className="text-gray-500 mt-2">
            Weekly & Monthly Sales Overview
          </p>
<div className="flex flex-wrap gap-3 mt-6">

  <button
  onClick={() => setDateFilter("all")}
  className={`px-4 py-2 rounded-lg transition ${
    dateFilter === "all"
      ? "bg-blue-600 text-white"
      : "bg-white border"
  }`}
>
  All Time
</button>

  <button
    onClick={() => setDateFilter("today")}
    className={`px-4 py-2 rounded-lg transition ${
      dateFilter === "today"
        ? "bg-blue-600 text-white"
        : "bg-white border"
    }`}
  >
    Today
  </button>

  <button
    onClick={() => setDateFilter("7days")}
    className={`px-4 py-2 rounded-lg transition ${
      dateFilter === "7days"
        ? "bg-blue-600 text-white"
        : "bg-white border"
    }`}
  >
    Last 7 Days
  </button>

  <button
    onClick={() => setDateFilter("30days")}
    className={`px-4 py-2 rounded-lg transition ${
      dateFilter === "30days"
        ? "bg-blue-600 text-white"
        : "bg-white border"
    }`}
  >
    Last 30 Days
  </button>

  <button
    onClick={() => setDateFilter("month")}
    className={`px-4 py-2 rounded-lg transition ${
      dateFilter === "month"
        ? "bg-blue-600 text-white"
        : "bg-white border"
    }`}
  >
    This Month
  </button>

</div>
          <div className="mt-6 flex justify-start">

  <button
    onClick={exportToExcel}
    className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto px-6 py-3 rounded-xl transition"
  >
    📄 Export Excel
  </button>

</div>

     <RevenueCards
  todayRevenue={todayRevenue}
  weeklyRevenue={weeklyRevenue}
  monthlyRevenue={monthlyRevenue}
/>

<StatisticsCards
  totalOrders={totalOrders}
  pendingOrders={pendingOrders}
  processingOrders={processingOrders}
  deliveredOrders={deliveredOrders}
/>

<WeeklyChart weekData={weekData} />

<MonthlyChart monthlyData={monthData} />

<RecentActivity recentOrders={recentOrders} />

<StatusPieChart statusData={statusData} />

<TopProducts topProducts={topProducts} />

<PaymentPieChart paymentData={paymentData} />

        </div>

      

    </>
  );
}

export default Sales;