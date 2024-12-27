import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserChart from './DashItemes/UserChart';
import PerMonthOrderData from './DashItemes/PerMonthOrderData';
import RevenueChart from './DashItemes/RevenueChart';
import WeeklyDataContainer from './DashItemes/WeeklyDataContainer';
import { DollarSign, Users, ShoppingCart, Layers } from 'lucide-react';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState("0.00");
  const [totalOrders, setTotalOrders] = useState();
  const [category, setCategory] = useState();
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetching the data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/order/get-all-order');
        const completedOrders = response.data.filter(order => order.status === 'completed');
        const total = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        const revenue20Percent = total * 0.2;
        setTotalRevenue(revenue20Percent.toFixed(2));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get/stats');
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/count');
        setCategory(response.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/order/total-orders');
        setTotalOrders(response.data.totalOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchOrdersData();
  }, []);

  return (
    <div className="py-10 px-6 lg:px-24 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <DollarSign className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-medium text-gray-600">Total Revenue (20%)</h2>
            <p className="text-2xl font-semibold text-blue-600">৳ {totalRevenue || "Loading..."}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <Users className="h-8 w-8 text-green-600" />
          <div>
            <h2 className="text-lg font-medium text-gray-600">Total Users</h2>
            <p className="text-2xl font-semibold text-green-600">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <ShoppingCart className="h-8 w-8 text-purple-600" />
          <div>
            <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
            <p className="text-2xl font-semibold text-purple-600">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <Layers className="h-8 w-8 text-purple-600" />
          <div>
            <h2 className="text-lg font-medium text-gray-600">Total Categories</h2>
            <p className="text-2xl font-semibold text-purple-600">{category}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-600 mb-4">Revenue Chart</h2>
          <RevenueChart />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-600 mb-4">User Growth</h2>
          <UserChart />
        </div>
      </div>

      {/* Order and Weekly Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-600 mb-4">Orders Per Month</h2>
          <PerMonthOrderData />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-600 mb-4">Weekly Orders and Sales</h2>
          <WeeklyDataContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
