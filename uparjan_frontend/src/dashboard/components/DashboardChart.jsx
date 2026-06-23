import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Bhopal",
    quantity: 4000,
  },
  {
    name: "Indore",
    quantity: 3000,
  },
  {
    name: "Gwalior",
    quantity: 5000,
  },
  {
    name: "Jabalpur",
    quantity: 2000,
  },
];

export default function DashboardChart() {

  return (
    <div className="chart-container">

      <h2>
        District Wise Procurement
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="quantity" />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}