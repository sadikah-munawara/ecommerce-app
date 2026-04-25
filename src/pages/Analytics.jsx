import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Analytics() {

  const [orders, setOrders] = useState([]);
  const [chartType, setChartType] = useState("line");

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

  }, []);

  // Convert orders to chart data
  const chartData = orders.map((order) => ({
    name: order.date,
    revenue: order.total
  }));

  return (

    <div style={{ padding: "40px" }}>

      <h1>Analytics Dashboard</h1>

      {/* Toggle buttons */}

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setChartType("line")}>
          Line Chart
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => setChartType("bar")}
        >
          Bar Chart
        </button>
      </div>

      {/* Chart */}

      <div style={{ width: "100%", height: 400 }}>

        <ResponsiveContainer>

          {chartType === "line" ? (

            <LineChart data={chartData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#00bcd4"
                strokeWidth={3}
              />

            </LineChart>

          ) : (

            <BarChart data={chartData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#00bcd4"
              />

            </BarChart>

          )}

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default Analytics;