import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const UserChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get/stats');
        const { totalUsers, studentCount, sellerCount, riderCount } = response.data;
        setTotalUsers(totalUsers);
        setChartData({
          labels: ['Students', 'Sellers', 'Riders'],
          datasets: [
            {
              label: 'User Distribution',
              data: [studentCount, sellerCount, riderCount],
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)', // Teal for Students
                'rgba(255, 159, 64, 0.6)', // Orange for Sellers
                'rgba(153, 102, 255, 0.6)', // Purple for Riders
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(2); // Calculate percentage
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className=" max-w-md mx-auto bg-white rounded-lg ">
      <h2 className="text-2xl font-bold text-center mb-4">User Distribution</h2>
      {chartData ? <Pie data={chartData} options={options} /> : <p>No data available</p>}
      <p className="text-sm text-gray-600 mt-4 text-center">Total Users: {totalUsers}</p>
    </div>
  );
};

export default UserChart;
