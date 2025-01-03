import axios from "axios";
import { Alert, Badge, Button, Card, Spinner, Textarea } from "flowbite-react";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Star,
  ThumbsUp,
  Truck,
  XCircle
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Star as StarRater } from "react-rater";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../utils/useAuth";
import LocationDisplay from "./../../components/LocationDisplay";
import Modal from "./../../components/Modal";
import NothingFound from "./../../components/NothingFound";

const StudentOrder = () => {
  const { id } = useAuth();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [rating,setRating]= useState(0);
  const [feedback,setFeedback]= useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Order History - Student";

    const getOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/order/get-order",
          {
            params: {
              role: "student",
              roleId: id,
            },
          }
        );
        setAllOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [id]);
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
  const handleCancelOrder = async (order) => {
    try {
      await axios.put(
        `http://localhost:8000/api/order/update-order/${order._id}`,
        {
          status: "canceled",
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order cancelled successfully",
      });
      await axios.post(
        `http://localhost:8000/api/notification/add-notification`,
        {
          userId: order.studentId,
          title: "Cancel Meal",
          message: `You have successfully Cancel Your order.`,
        }
      );
      await axios.post(
        `http://localhost:8000/api/notification/add-notification`,
        {
          userId: order.sellerId,
          title: "Your Meal Cancelled",
          message: `Hi ${order.sellerId.fullName}, Your meal has been cancelled by ${order.studentId.fullName}.`,
        }
      );
      window.location.reload();
    } catch (err) {
      console.error("Error cancelling order:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to cancel order",
      });
    }
  };
  const handleRateOrder =async({itemId,studentId,orderId,sellerId}) => {
    console.log("🚀 ~ handleRateOrder ~ orderId,studentId:", itemId,studentId)
    console.log("🚀 ~ handleRateOrder ~ id:", id)
    try {
      await axios.post(`http://localhost:8000/api/rating/add-rating`, {
      studentId:studentId,
      itemId: itemId,
      review: feedback,
      star: rating,
    });
    const response = await axios.put(
      `http://localhost:8000/api/order/update-order/${orderId}`,
      {
        review: "rated",
      }
    );
    const notificationRes = await axios.post(
      `http://localhost:8000/api/notification/add-notification`,
      {
        userId: sellerId,
        title: "Order Rated",
        message: ` Your order has been successfully rated  as ${rating} stars and review: ${feedback} on #${itemId} item.`,
      }
    );
    setRating(null)
    setFeedback(null)
    setModalData(null)
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Order rated successfully",
    })
    } catch (error) {
      console.error("Error rating order:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to rate order",
      });
    }
  }

  const statusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Loader2 className="text-yellow-500 animate-spin" size={20} />;
      case "in_progress":
        return <Truck className="text-blue-500" size={20} />;
      case "accepted_by_rider":
        return <ThumbsUp className="text-green-500" size={20} />;
      case "completed":
        return <CheckCircle className="text-green-500" size={20} />;
      case "canceled":
      case "cancelled_by_seller":
      case "cancelled_by_rider":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📦 Order History
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" />
        </div>
      ) : allOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allOrders.map((order) => {
            const total = order.totalPrice + order.deliveryFee;

            return (
              <Card
                key={order._id}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <Badge color="info" className="mt-1">
                      {order.paymentMethod.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-3 md:mt-0">
                    {statusIcon(order.status)}
                    <span
                      className={`font-semibold ${
                        order.status === "Delivered"
                          ? "text-green-500"
                          : order.status === "Cancelled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-4 text-sm text-gray-600">
                  📍 <strong>Delivery Address:</strong> Lat:{" "}
                  {order.deliveryAddress.lat}, Lang:{" "}
                  {order.deliveryAddress.lang}
                  <LocationDisplay
                    lat={order.deliveryAddress.lat}
                    lng={order.deliveryAddress.lang}
                  />
                </div>

                {/* Items */}
                <div className="border-t border-gray-200 pt-2 space-y-2 max-h-40 overflow-y-auto">
                  {order.items.map((item, index) => (
                    <div
                      className="flex items-center gap-6 flex-1"
                      key={index}
                      onClick={() => handleDetailsClick(item)}
                    >
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
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-gray-300 pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">
                  {order.status === "canceled" ||
                  order.status === "in_progress" ||
                  order.status === "pending" ||
                  order.status === "cancelled_by_rider" ||
                  order.status === "completed" ? null : (
                    <Button
                      color="gray"
                      size="sm"
                      onClick={() => {
                        if (order.paymentMethod === "self-shipping") {
                          navigate(`../me-as-a-rider/${order._id}`);
                        } else navigate(`../current-delivery/${order._id}`);
                      }}
                    >
                      <Truck size={16} className="mr-2" />
                      Track Order
                    </Button>
                  )}
                  {order.status === "in_progress" && (
                    <Alert color="success" withBorderAccent>
                      <span>
                        <span className="font-medium">
                          Wait For Assign Rider
                        </span>{" "}
                        - Your order is in progress.
                      </span>
                    </Alert>
                  )}
                  {order.status === "pending" && (
                    <Button
                      color="failure"
                      size="sm"
                      onClick={() => {
                        handleCancelOrder(order);
                      }}
                    >
                      Cancel Order
                    </Button>
                  )}
                  {order.status === "completed" && (
                    <>
                      {order.review === "rated" ? (
                        <Alert color="warning" withBorderAccent>
                          <span>
                            <span className="font-medium">
                              You Have Rated This Meal
                            </span>{" "}
                            - Thanks for your feedback.
                          </span>
                        </Alert>
                      ) : (
                        <Button
                          color="warning"
                          size="sm"
                          onClick={() => {
                            setModalData({
                              orderId: order._id,
                              itemId: order.items[0].itemId,
                              studentId: order.studentId._id,
                              sellerId : order.sellerId._id
                            });
                          }}
                        >
                          <Star size={16} className="mr-2" />
                          Rate This Meal
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <NothingFound message="No orders found. Start placing your first order now!" />
      )}
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
      {modalData&&<Modal
        handleModalClose={() => setModalData(null)}
        title={"Order is Completed"}
      >
        <div className="space-y-4">
          {/* Feedback Textarea */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Share your experience:
            </label>
            <Textarea
              placeholder="Write your feedback here..."
              rows={4}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Rating Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rate your experience:
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarRater
                  key={star}
                  size={30}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Button onClick={() => handleRateOrder(modalData)} async color="blue">
              Submit
            </Button>
          </div>
        </div>
      </Modal>}
    </div>
  );
};

export default StudentOrder;
