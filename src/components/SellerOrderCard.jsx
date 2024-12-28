import axios from "axios";
import { Check, ChevronRight, CreditCard, ShoppingCart, X } from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "./Modal";

const OrderedCard = ({ order,key }) => {
  const { items, totalPrice, status, paymentMethod } = order;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleDetailsClick = async (item) => {
    console.log("🚀 ~ handleDetailsClick ~ item:", item);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/item/get-item/${item.itemId}`
      );
      setMeal(response.data); // Assuming response.data contains the orders
      console.log("🚀 ~ handleDetailsClick ~ response.data:", response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  const handleAcceptOrder = async (order) => {
    try {
      await axios.put(
        `http://localhost:8000/api/order/update-order/${order._id}`,
        {
          status:
            order.paymentMethod === "self-shipping"
              ? "accepted_by_rider"
              : "in_progress",
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order accepted successfully",
      })
      setCurrentStatus("in_progress");
    }
    catch (err) {
      console.error("Error accepting order:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to accept order",
      });
    }
  }
  const handleCancelOrder = async (order) => {
    try {
      await axios.put(`http://localhost:8000/api/order/update-order/${order._id}`, {
        status: "cancelled_by_seller",
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order cancelled successfully",
      })
      setCurrentStatus("cancelled");
    }
    catch (err) {
      console.error("Error cancelling order:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to cancel order",
      });
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="w-full min-w-[90rem] mx-auto"key={key}>
      <div className="bg-white rounded-xl shadow-xl border border-slate-200">
        <div className="p-8">
          {/* Enhanced Header Section */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-slate-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  {items.length} item{items.length !== 1 && "s"}
                </h2>
              </div>
              <div
                className={`px-5 py-2 rounded-full border-2 ${getStatusColor(
                  currentStatus
                )}`}
              >
                <span className="text-base font-semibold capitalize">
                  {currentStatus}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-slate-500" />
                <span className="text-base text-slate-600 capitalize">
                  {paymentMethod}
                </span>
              </div>
              <div className="bg-slate-900 text-white px-6 py-2 rounded-lg">
                <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Items List */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-slate-50/50"
                onClick={() => handleDetailsClick(item)}
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <span className="text-slate-600 font-semibold">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-slate-900">
                      {item.name || `Item #${item.itemId}`}
                    </span>
                    {item.quantity && (
                      <span className="text-sm text-slate-500">
                        Quantity: {item.quantity}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {item.price && (
                    <span className="text-lg font-semibold text-slate-700">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Action Buttons */}
          {currentStatus==='pending'&&<div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => {handleAcceptOrder(order)}}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Check className="h-5 w-5" />
              <span className="font-semibold">Accept Order</span>
            </button>
            <button
              onClick={() => {handleCancelOrder(order)}}
              className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 transition-all duration-200"
            >
              <X className="h-5 w-5" />
              <span className="font-semibold">Decline Order</span>
            </button>
          </div>}
        </div>
      </div>
      {meal && (
        <Modal handleModalClose={() => setMeal(null)} title={meal.itemName}>
          <div className="flex items-center gap-4">
            {/* Display the image, either from base64 or fallback */}
            <img
              src={meal.imageBase64}
              alt={meal.itemName || "Meal image"}
              className="h-40 w-40 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              {/* Item Name */}
              <span className="text-2xl font-semibold text-slate-900">
                {meal.itemName || "Item name not available"}
              </span>

              {/* Item Description */}
              <span className="text-lg text-slate-500">
                {meal.description || "No description available"}
              </span>

              {/* Display Price or Discounted Price */}
              <div className="flex items-center gap-2">
                <span className="text-lg text-slate-500 line-through">
                  {meal.discountPrice
                    ? `$${meal.discountPrice.toLocaleString()}`
                    : ""}
                </span>
                <span className="text-xl font-bold text-slate-900">
                  ${meal.price.toLocaleString()}
                </span>
              </div>

              {/* Display Discount Price if available */}
              {meal.discountPrice && meal.discountPrice < meal.price && (
                <span className="text-lg text-red-500">
                  Discount Price: ${meal.discountPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderedCard;
