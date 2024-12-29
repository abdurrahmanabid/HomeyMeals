import axios from "axios";
import { Card } from "flowbite-react";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Loader,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../utils/useAuth";
import Taka from "./../../components/Taka";

const ORDER_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  ACCEPTED_BY_RIDER: "accepted_by_rider",
  COMPLETED: "completed",
  CANCELED: "canceled",
  CANCELLED_BY_SELLER: "cancelled_by_seller",
  CANCELLED_BY_RIDER: "cancelled_by_rider",
  ASSIGNED_TO_RIDER: "assigned_to_rider",
};

const DashboardOverview = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id: myId } = useAuth();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [itemsResponse, ordersResponse] = await Promise.all([
        fetch("http://localhost:8000/api/item/items").then((res) => res.json()),
        axios
          .get("http://localhost:8000/api/order/get-order", {
            params: { role: "seller", roleId: myId },
          })
          .then((res) => res.data),
      ]);

      setItems(itemsResponse);
      setOrders(ordersResponse);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [myId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dashboardMetrics = useMemo(() => {
    if (isLoading) {
      return {
        totalOrders: "Loading...",
        revenue: "Loading...",
        activeOrders: "Loading...",
        totalProducts: "Loading...",
        myProducts: "Loading...",
        completedOrders: "Loading...",
        cancelledOrders: "Loading...",
        inProgressOrders: "Loading...",
        pendingOrders: "Loading...",
        assignedOrders: "Loading...",
      };
    }

    const myItems = items.filter((item) => item.sellerId === myId);
    const myOrdersFiltered = orders.filter(
      (order) => order.sellerId?._id === myId
    );

    // Calculate total revenue from completed orders (80% of total)
    const totalRevenue = myOrdersFiltered
      .filter((order) => order.status === ORDER_STATUS.COMPLETED)
      .reduce((sum, order) => {
        const orderTotal = order.totalPrice || 0;
        const sellerShare = orderTotal * 0.8; // 80% of total
        return sum + sellerShare;
      }, 0);

    // Count orders by status
    const orderCounts = myOrdersFiltered.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    // Calculate active orders (pending + in_progress + accepted_by_rider + assigned_to_rider)
    const activeOrdersCount =
      (orderCounts[ORDER_STATUS.PENDING] || 0) +
      (orderCounts[ORDER_STATUS.IN_PROGRESS] || 0) +
      (orderCounts[ORDER_STATUS.ACCEPTED_BY_RIDER] || 0) +
      (orderCounts[ORDER_STATUS.ASSIGNED_TO_RIDER] || 0);

    // Calculate cancelled orders (all cancellation statuses)
    const cancelledOrdersCount =
      (orderCounts[ORDER_STATUS.CANCELED] || 0) +
      (orderCounts[ORDER_STATUS.CANCELLED_BY_SELLER] || 0) +
      (orderCounts[ORDER_STATUS.CANCELLED_BY_RIDER] || 0);

    return {
      totalOrders: myOrdersFiltered.length,
      revenue: totalRevenue.toFixed(2),
      activeOrders: activeOrdersCount,
      totalProducts: items.length,
      myProducts: myItems.length,
      completedOrders: orderCounts[ORDER_STATUS.COMPLETED] || 0,
      cancelledOrders: cancelledOrdersCount,
      inProgressOrders: orderCounts[ORDER_STATUS.IN_PROGRESS] || 0,
      pendingOrders: orderCounts[ORDER_STATUS.PENDING] || 0,
      assignedOrders:
        (orderCounts[ORDER_STATUS.ASSIGNED_TO_RIDER] || 0) +
        (orderCounts[ORDER_STATUS.ACCEPTED_BY_RIDER] || 0),
    };
  }, [items, orders, myId, isLoading]);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card className="max-w-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2 text-gray-500">{title}</div>
          <div className="flex items-center gap-2">
            {title === "Revenue" && <Taka />}
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </div>
          </div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );

  const StatItem = ({ label, value, icon: Icon }) => (
    <Card className="max-w-sm">
      <div className="flex items-center space-x-4">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {label}
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {value}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Active Orders"
            value={dashboardMetrics.activeOrders}
            icon={Clock}
            color="bg-yellow-600"
            subtitle="Need attention"
          />
          <StatCard
            title="Revenue"
            value={dashboardMetrics.revenue}
            icon={DollarSign}
            color="bg-green-600"
            subtitle="80% of completed orders"
          />
          <StatCard
            title="Total Orders"
            value={dashboardMetrics.totalOrders}
            icon={ShoppingBag}
            color="bg-blue-600"
            subtitle="All time"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatItem
            label="Pending Orders"
            value={dashboardMetrics.pendingOrders}
            icon={Clock}
          />
          <StatItem
            label="In Progress"
            value={dashboardMetrics.inProgressOrders}
            icon={Loader}
          />
          <StatItem
            label="Assigned to Rider"
            value={dashboardMetrics.assignedOrders}
            icon={Truck}
          />
          <StatItem
            label="Completed Orders"
            value={dashboardMetrics.completedOrders}
            icon={CheckCircle}
          />
          <StatItem
            label="Cancelled Orders"
            value={dashboardMetrics.cancelledOrders}
            icon={XCircle}
          />
          <StatItem
            label="Total Products"
            value={dashboardMetrics.totalProducts}
            icon={Package}
          />
          <StatItem
            label="My Products"
            value={dashboardMetrics.myProducts}
            icon={ShoppingBag}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
