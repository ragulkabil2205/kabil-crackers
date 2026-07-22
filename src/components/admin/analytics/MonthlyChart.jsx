import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function MonthlyChart({ monthlyData }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

      <h2 className="text-2xl font-bold mb-6">
        📈 Monthly Revenue
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={monthlyData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `₹ ${Number(value).toLocaleString()}`,
              "Revenue",
            ]}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#16a34a"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default MonthlyChart;