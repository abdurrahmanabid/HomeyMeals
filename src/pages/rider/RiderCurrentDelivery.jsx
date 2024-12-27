import axios from "axios";
import { Badge, Button, Card, Spinner } from "flowbite-react";
import { Check, Clock, CreditCard, MapPin, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Distance from "../../components/Distance";
import LocationDisplay from "../../components/LocationDisplay";
import useAuth from "../../utils/useAuth";

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
    case "assigned_to_rider":
      return "warning";
    case "in_progress":
    case "accepted_by_rider":
      return "info";
    case "canceled":
    case "cancelled_by_seller":
    case "cancelled_by_rider":
      return "failure";
    default:
      return "warning";
  }
};

const getStatusDisplay = (status) => {
  return (
    status
      ?.replace(/_/g, " ")
      .replace(/by/g, "By")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Processing"
  );
};

const RiderCurrentDelivery = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState();
  const [riderCurrentLocation, setRiderCurrentLocation] = useState();
  const { role } = useAuth();

  useEffect(() => {
    if (role === "Rider") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRiderCurrentLocation({ lat: latitude, lng: longitude });
            console.log("Current Latitude:", latitude);
            console.log("Current Longitude:", longitude);
          },
          (error) => {
            console.error("Error getting geolocation:", error.message);
            Swal.fire({
              icon: "error",
              title: "Geolocation is not supported by this browser.",
            });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/order/get-a-order/${orderId}`
        );
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);
  const handleDelivered=async(orderId)=>{
    try {
        const response = await axios.put(
          `http://localhost:8000/api/order/update-order/${orderId}`,
          {
            status: "completed",
            money: {
              deliveryFee: orderDetails?.deliveryFee,
              totalPrice: orderDetails?.totalPrice,
            },
          }
        );
        Swal.fire({
          icon:'success',
          title:"Order Completed",
          text:"You have successfully Complete Your order."
        })
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
  }

  const renderActionButtons = () => {
    switch (role) {
      case "Rider":
        return (
          <div className="flex gap-2">
            {orderDetails?.status === "accepted_by_rider" && (
              <Button color="success" className="w-full" onClick={()=>handleDelivered(orderId)}>
                <Check className="h-4 w-4 mr-2" />
                Mark as Delivered
              </Button>
            )}
          </div>
        );

      case "seller":
        return (
          <div className="space-y-2">
            <Button color="info" className="w-full">
              <Clock className="h-4 w-4 mr-2" />
              Track Order
            </Button>
            {orderDetails?.status === "pending" && (
              <Button color="failure" className="w-full">
                <X className="h-4 w-4 mr-2" />
                Cancel Order
              </Button>
            )}
          </div>
        );

      case "Student":
        return (
          <div className="space-y-2">
            {/* Editable Note Section */}
            <div className="mb-4">
              <label
                htmlFor="studentNote"
                className="block text-gray-700 font-semibold mb-2"
              >
                Update Your Note
              </label>
              <textarea
                id="studentNote"
                onChange={(e) => setNote(e.target.value)} // Handle input change
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                rows="4"
                placeholder="Enter your note here..."
              />
              <Button color="success" className="w-full">
                <Check className="h-4 w-4 mr-2" />
                Send Your Note
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderAdditionalInfo = () => {
    switch (role) {
      case "Student":
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{orderDetails?.sellerId?.fullName}</p>
              <p>{orderDetails?.sellerId?.phone}</p>
            </div>
          </div>
        );

      case "seller":
      case "Rider":
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{orderDetails?.studentId?.fullName}</p>
              <p>{orderDetails?.studentId?.phone}</p>
              <p className="mt-2">{orderDetails?.customerNotes}</p>
            </div>
          </div>
        );
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 min-w-[80vh]">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Order #{orderId}</h2>
          <Badge color={getStatusColor(orderDetails?.status)}>
            {getStatusDisplay(orderDetails?.status)}
          </Badge>
        </div>

        {renderAdditionalInfo()}

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Delivery Location</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {orderDetails?.deliveryAddress ? (
                    <LocationDisplay
                      lat={orderDetails.deliveryAddress.lat}
                      lng={orderDetails.deliveryAddress.lang}
                    />
                  ) : (
                    "No location"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Order Items</h3>
            <div className="max-h-[200px] overflow-y-auto">
              {orderDetails?.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span>
                    {item.quantity}x Item #{item.itemId}
                  </span>
                  <span className="font-medium">${item.price?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${orderDetails?.totalPrice?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>${orderDetails?.deliveryFee?.toFixed(2) || "0.00"}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  $
                  {(
                    (orderDetails?.totalPrice || 0) +
                    (orderDetails?.deliveryFee || 0)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CreditCard className="h-4 w-4" />
                <span>{orderDetails?.paymentMethod || "N/A"}</span>
              </div>
            </div>
          </div>

          {(role === "Rider" || role === "Student") && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Delivery Distance</h3>
              <Distance
                dLat={orderDetails.deliveryAddress.lat}
                dLng={orderDetails.deliveryAddress.lang}
                rLat
                rLng
              />
            </div>
          )}
        </div>

        <div className="mt-6">{renderActionButtons()}</div>
      </Card>
    </div>
  );
};

export default RiderCurrentDelivery;
