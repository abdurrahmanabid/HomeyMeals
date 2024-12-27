import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeeklyComparisonChart = ({ weeklyData }) => {
  const labels = weeklyData.map((data) => data.week); // Weeks

  const data = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: weeklyData.map((data) => data.orders),
        borderColor: "rgba(59, 130, 246, 1)", // Blue color
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Transparent blue
        tension: 0.4, // Smooth curves
      },
      {
        label: "Sales",
        data: weeklyData.map((data) => data.sales),
        borderColor: "rgba(239, 68, 68, 1)", // Red color
        backgroundColor: "rgba(239, 68, 68, 0.2)", // Transparent red
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Week" } },
      y: { title: { display: true, text: "Count" } },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeeklyComparisonChart;
