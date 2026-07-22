import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function StatusPieChart({ statusData }) {
  const COLORS = [
    "#facc15",
    "#2563eb",
    "#16a34a",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

      <h2 className="text-2xl font-bold mb-6">
        📈 Order Status Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <PieChart>

          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >

            {statusData.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StatusPieChart;