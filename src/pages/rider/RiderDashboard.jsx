import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import useAuth from "../../utils/useAuth";

const RiderDashboard = () => {
  const { id } = useAuth(); // Auth hook for rider ID
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("last-month");

  // Fetch Orders API Call
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/order/get-order",
        { params: { role: "rider", roleId: id } }
      );
      setOrders(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch orders");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [id]);

  // Calculate Order Statistics
  const calculateStats = () => {
    if (!orders.length)
      return {
        pending: 0,
        inProgress: 0,
        accepted: 0,
        completed: 0,
        cancelled: 0,
        cancelledBySeller: 0,
        cancelledByRider: 0,
        assignedToRider: 0,
        newRequests: 0,
        totalEarnings: 0,
        deliveryEarnings: 0,
      };

    return orders.reduce(
      (stats, order) => {
        const deliveryCharge = order.deliveryFee || 0;

        switch (order.status) {
          case "assigned_to_rider":
            stats.pending++;
            break;
          case "in_progress":
            stats.inProgress++;
            break;
          case "accepted_by_rider":
            stats.accepted++;
            break;
          case "completed":
            stats.completed++;
            stats.deliveryEarnings += deliveryCharge;
            break;
          case "canceled":
          case "cancelled_by_seller":
            stats.cancelledBySeller++;
            break;
          case "cancelled_by_rider":
            stats.cancelledByRider++;
            break;
          case "assigned_to_rider":
            stats.assignedToRider++;
            break;
          default:
            break;
        }

        stats.totalEarnings += deliveryCharge;
        return stats;
      },
      {
        pending: 0,
        inProgress: 0,
        accepted: 0,
        completed: 0,
        cancelled: 0,
        cancelledBySeller: 0,
        cancelledByRider: 0,
        assignedToRider: 0,
        newRequests: 0,
        totalEarnings: 0,
        deliveryEarnings: 0,
      }
    );
  };

  const stats = calculateStats();

  // Loader State
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-600 bg-white p-6 rounded-lg shadow-lg text-xl font-semibold">
          {error}
        </div>
      </div>
    );
  }

  // Dashboard UI
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center p-6">
      <div className="bg-white max-w-6xl w-full rounded-xl shadow-xl p-8">
        {/* Overview Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b-4 pb-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Rider Dashboard Overview
          </h2>
          <select
            className="border-2 rounded-lg px-6 py-3 text-gray-700 bg-gray-50 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="last-month">Last Month</option>
            <option value="last-2-months">Last 2 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-gradient-to-t from-green-500 to-teal-500 text-white rounded-xl shadow-xl flex flex-col items-center gap-4">
            <div className="p-4 bg-white text-teal-500 rounded-full">
              <FaFileAlt size={32} />
            </div>
            <h3 className="text-4xl font-bold">{stats.pending}</h3>
            <p className="text-xl">Pending Orders</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-xl text-center">
            <h3 className="text-4xl font-bold text-green-600">
              {stats.completed}
            </h3>
            <p className="text-xl text-gray-600">Completed Orders</p>
            <p className="text-2xl text-teal-500 font-semibold">
              ${stats.deliveryEarnings.toFixed(2)} Earned
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-xl text-center">
            <h3 className="text-4xl font-bold text-red-600">
              {stats.cancelledBySeller}
            </h3>
            <p className="text-xl text-gray-600">Cancelled by Seller</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-xl text-center">
            <h3 className="text-4xl font-bold text-red-600">
              {stats.cancelledByRider}
            </h3>
            <p className="text-xl text-gray-600">Cancelled by Rider</p>
          </div>
        </div>

        {/* Total Earnings Section */}
        <div className="mt-8 border-t pt-6 text-center">
          <h3 className="text-2xl font-medium text-gray-800">
            Total Earnings:{" "}
            <span className="text-teal-600">
              ${stats.totalEarnings.toFixed(2)}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
