
import { useOrders } from "../../context/OrdersContext";



import * as XLSX from "xlsx";
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

  // Today's Revenue
  const todayRevenue = orders
    .filter((order) => {
      if (order.status !== "Delivered") return false;

      const date = new Date(order.orderDate);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  // Monthly Revenue
  const monthlyRevenue = orders
    .filter((order) => {
      if (order.status !== "Delivered") return false;

      const date = new Date(order.orderDate);

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
    const totalOrders = orders.length;

const pendingOrders = orders.filter(
  (order) => order.status === "Pending"
).length;

const processingOrders = orders.filter(
  (order) => order.status === "Processing"
).length;

const deliveredOrders = orders.filter(
  (order) => order.status === "Delivered"
).length;

const recentOrders = [...orders]
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
const exportToExcel = () => {
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

orders.forEach((order) => {
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
  orders.forEach((order) => {
    if (order.status !== "Delivered") return;

    const date = new Date(order.orderDate);

    if (isNaN(date.getTime())) return;

    const dayIndex = date.getDay();

    weekData[dayIndex].sales += Number(order.total || 0);
  });

  // Weekly Revenue
  const weeklyRevenue = weekData.reduce(
    (sum, item) => sum + item.sales,
    0
  );

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

orders.forEach((order) => {
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