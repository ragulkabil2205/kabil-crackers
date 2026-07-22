import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function WeeklyChart({ weekData }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

      <h2 className="text-2xl font-bold mb-6">
        📅 Weekly Sales
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={weekData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `₹ ${Number(value).toLocaleString()}`,
              "Revenue",
            ]}
          />

          <Bar
            dataKey="sales"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default WeeklyChart;