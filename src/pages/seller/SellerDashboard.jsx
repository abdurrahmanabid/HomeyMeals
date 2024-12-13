import React, { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import Taka from "../../components/Taka";
import useAuth from "../../utils/useAuth";

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: "Loading...",
    revenue: "Loading...",
    pendingOrders: "Loading...",
    totalProducts: "Loading...",
    myProducts: "Loading...",
    deliveredOrders: "Loading...",
    cancelledOrders: "Loading...",
  });

  const { id: myId } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/item/items");
        const data = await response.json();

        const totalProducts = data.length;
        const myProducts = data.filter((item) => item.sellerId === myId).length;
        const deliveredOrders = data.filter(
          (item) => item.status === "delivered" && item.sellerId === myId
        ).length;
        const cancelledOrders = data.filter(
          (item) => item.status === "idle" && item.sellerId === myId
        ).length;
        const pendingOrders = data.filter(
          (item) => item.status === "pending" && item.sellerId === myId
        ).length;
        // const revenue = data
        //   .filter(
        //     (item) => item.sellerId === myId && item.status === "delivered"
        //   )
        //   .reduce((sum, item) => sum + item.price, 0);

        setDashboardData({
          totalOrders: data.length,
          revenue: "Coming soon",
          pendingOrders,
          totalProducts,
          myProducts,
          deliveredOrders: "Coming soon",
          cancelledOrders,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setDashboardData({
          totalOrders: 0,
          revenue: 0,
          pendingOrders: 0,
          totalProducts: 0,
          myProducts: 0,
          deliveredOrders: 0,
          cancelledOrders: 0,
        });
      }
    };

    fetchDashboardData();
  }, [myId]);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
      <div className="bg-white text-gray-700 mx-auto grid max-w-6xl grid-cols-1 gap-y-6 gap-x-6 p-6 sm:grid-cols-2 lg:grid-cols-3 rounded-lg shadow-lg">
        {/* Overview Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 border-b pb-4">
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        </div>

        {/* Orders Section */}
        <div className="col-span-1 bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-lg">
          <h3 className="mb-4 text-lg font-medium text-white">Total Orders</h3>
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-500 mr-4">
              <FaFileAlt className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {dashboardData.totalOrders}
              </p>
              <p className="text-sm text-green-100">Completed this month</p>
            </div>
          </div>
        </div>

        {/* Revenue Section */}
        <div className="col-span-1 bg-gradient-to-r from-blue-400 to-blue-500 p-6 rounded-lg">
          <h3 className="mb-4 text-lg font-medium text-white">Revenue</h3>
          <p className="text-3xl font-bold text-white flex gap-2">
            <Taka/>{dashboardData.revenue}
          </p>
          <p className="text-sm text-blue-100">This month</p>
        </div>

        {/* Pending Orders Section */}
        <div className="col-span-1 bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-lg">
          <h3 className="mb-4 text-lg font-medium text-white">
            Pending Orders
          </h3>
          <p className="text-3xl font-bold text-white">
            {dashboardData.pendingOrders}
          </p>
          <p className="text-sm text-yellow-100">Action required</p>
        </div>

        {/* Order Breakdown */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-6 border-t pt-6">
          <div className="text-center">
            <p className="text-gray-500">Total Products</p>
            <p className="text-xl font-bold">{dashboardData.totalProducts}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">My Products</p>
            <p className="text-xl font-bold">{dashboardData.myProducts}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Delivered Orders</p>
            <p className="text-xl font-bold">{dashboardData.deliveredOrders}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Cancelled Orders</p>
            <p className="text-xl font-bold">{dashboardData.cancelledOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerDashboard = () => {
  return (
    <div>
      <DashboardOverview />
    </div>
  );
};

export default SellerDashboard;
