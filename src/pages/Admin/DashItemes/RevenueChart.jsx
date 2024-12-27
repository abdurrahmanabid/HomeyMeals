import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const RevenuePieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966FF', // Purple
        ],
        hoverOffset: 6,
      },
    ],
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/order/get-all-order');

        // Filter for completed orders
        const completedOrders = response.data.filter(order => order.status === 'completed');

        // Calculate total revenue and 20%
        const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        const revenue20Percent = totalRevenue * 0.2;

        // Prepare chart data
        setChartData({
          labels: ['Total Revenue', 'Revenue (20%)'],
          datasets: [
            {
              data: [totalRevenue.toFixed(2), revenue20Percent.toFixed(2)],
              backgroundColor: ['#36A2EB', '#FF6384'], // Colors for the slices
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full max-w-lg p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Revenue Distribution
      </h2>
      <div className="relative">
        <Pie data={chartData} />
      </div>
      <p className="text-sm text-gray-600 mt-4 text-center">
        This chart compares the total revenue with its 20% share from completed orders.
      </p>
    </div>
  );
};

export default RevenuePieChart;
