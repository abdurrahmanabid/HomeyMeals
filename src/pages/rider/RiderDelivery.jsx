import axios from "axios";
import { format } from "date-fns";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HomeyMealsLoader from "../../components/HomeyMealsLoader";
import LocationDisplay from "../../components/LocationDisplay";
import NothingFound from "./../../components/NothingFound";
import useAuth from "./../../utils/useAuth";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      class: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Clock,
    },
    in_progress: {
      class: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Truck,
    },
    delivered: {
      class: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle,
    },
    cancelled_by_seller: {
      class: "bg-rose-50 text-rose-700 border-rose-200",
      icon: XCircle,
    },
    cancelled_by_rider: {
      class: "bg-rose-50 text-rose-700 border-rose-200",
      icon: XCircle,
    },
    accepted_by_rider: {
      class: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Truck,
    },
  };

  const config = statusConfig[status] || {
    class: "bg-gray-50 text-gray-700 border-gray-200",
    icon: AlertCircle,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${config.class}`}
    >
      <Icon size={14} />
      {status?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
    </span>
  );
};

const RiderDelivery = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useAuth();
  console.log("🚀 ~ RiderDelivery ~ id:", id);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/order/get-order",
        {
          params: { role: "rider", roleId: id },
        }
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
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      // Add your API call here
      await axios.put(
        `http://localhost:8000/api/order/update-order/${orderId}`,
        {
          status: "accepted_by_rider",
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order accepted successfully",
      });
      // Refresh orders after successful acceptance
      await fetchOrders();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to accept order",
      });
      console.error("Error accepting order:", error);
    }
  };

  const handleDeclineOrder = async (orderId) => {
    try {
      // Add your API call here
      await axios.put(
        `http://localhost:8000/api/order/update-order/${orderId}`,
        {
          status: "cancelled_by_rider",
          riderId: null,
          cancellationReason: "Rider declined the order",
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order declined successfully",
      });
      // Refresh orders after successful decline
      await fetchOrders();
    } catch (error) {
      console.error("Error declining order:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to decline order",
      });
    }
  };

  if (loading) {
    return <HomeyMealsLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Error</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <div className="mt-6">
            <button
              onClick={fetchOrders}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <RefreshCw size={16} /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Delivery Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                <Package size={16} />
                {orders.length} Active Deliveries
              </span>
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-900/5 transition hover:bg-gray-50"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5"
              >
                <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-sm font-semibold text-gray-900">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </h3>
                          <StatusBadge status={order.status} />
                        </div>
                        <p className="mt-1 text-xs text-gray-500 inline-flex items-center gap-1.5">
                          <Clock size={14} />
                          {format(new Date(order.orderDate), "PPp")}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                </div>

                <div className="px-6 py-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          <User size={16} /> Customer Information
                        </h4>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm text-gray-600">
                            {order.studentId.fullName}
                          </p>
                          <p className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} /> {order.studentId.phone}
                          </p>
                          <p className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} /> {order.studentId.email}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          <MapPin size={16} /> Delivery Location
                        </h4>
                        <div className="mt-3 rounded-lg bg-gray-50 p-3">
                          <p className="text-sm text-gray-600">
                            Lat: {order.deliveryAddress.lat}
                            <br />
                            Long: {order.deliveryAddress.lang}
                          </p>
                          <LocationDisplay
                            lat={order.deliveryAddress.lat}
                            lng={order.deliveryAddress.lang}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="rounded-lg bg-gray-50 p-4">
                        <h4 className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          <Package size={16} /> Order Details
                        </h4>
                        <div className="mt-4 space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm"
                            >
                              <span className="text-sm text-gray-600">
                                #{item.itemId.slice(-6).toUpperCase()}
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-between border-t pt-4">
                          <span className="text-sm font-medium text-gray-700">
                            Total Amount
                          </span>
                          <span className="text-lg font-bold text-blue-600">
                            ${order.totalPrice}
                          </span>
                        </div>
                      </div>

                      {order.status === "in_progress" && (
                        <div className="mt-6 flex justify-end gap-3">
                          <button
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            onClick={() => handleDeclineOrder(order._id)}
                          >
                            <XCircle size={16} /> Decline
                          </button>
                          <button
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                            onClick={() => handleAcceptOrder(order._id)}
                          >
                            <CheckCircle size={16} /> Accept
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NothingFound />
        )}
      </div>
    </div>
  );
};

export default RiderDelivery;
