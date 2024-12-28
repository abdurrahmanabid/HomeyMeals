import axios from "axios";
import {
  Badge,
  Button,
  Card,
  Clipboard,
  Spinner,
  Textarea,
} from "flowbite-react";
import { Check, Clock, CreditCard, MapPin, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Star } from "react-rater";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Distance from "../../components/Distance";
import LocationDisplay from "../../components/LocationDisplay";
import Modal from "../../components/Modal";
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
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const { role: userRole, id } = useAuth();
  const [role, setRole] = useState(userRole);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "Rider") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            console.log(
              `Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters`
            );

            try {
              // Update database with Axios
              const response = await axios.put(
                `http://localhost:8000/api/profile/map/put/${id}`,
                {
                  lat: latitude,
                  lng: longitude,
                }
              );
              setRiderCurrentLocation({ lat: latitude, lng: longitude });
            } catch (error) {
              console.error("Failed to update location:", error.message);
            }
          },
          async (error) => {
            console.error("Error getting geolocation:", error.message);
            try {
              // Fallback to server-stored location
              const response = await axios.get(
                `http://localhost:8000/api/profile/get/${id}`
              );
              setRiderCurrentLocation({
                lat: response.data.profile.lat,
                lng: response.data.profile.lng,
              });
            } catch (error) {
              console.error(
                "Failed to fetch fallback location:",
                error.message
              );
            }
          },
          {
            enableHighAccuracy: true, // Use GPS hardware
            timeout: 15000, // Increased timeout to 15 seconds
            maximumAge: 0, // No cached results
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  }, [role, id]);

  useEffect(() => {
    const fetchRider = async () => {
      try {
        // Fallback to server-stored location
        const response = await axios.get(
          `http://localhost:8000/api/profile/get/${orderDetails.riderId._id}`
        );
        setRiderCurrentLocation({
          lat: response.data.profile.lat,
          lng: response.data.profile.lng,
        });
      } catch (error) {
        console.error("Failed to fetch fallback location:", error.message);
      }
    };
    fetchRider();
  }, [orderDetails]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/order/get-a-order/${orderId}`
        );
        const data = await response.json();
        console.log("🚀 ~ fetchOrderDetails ~ response:", data.paymentMethod);
        if (role === "Student" && data.paymentMethod === "self-shipping") {
          setRole("Rider");
        }
        setOrderDetails(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);
  const handleDelivered = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/order/update-order/${orderId}`,
        {
          status: "completed",
          paymentStatus: "completed",
        }
      );
      Swal.fire({
        icon: "success",
        title: "Order Completed",
        text: `You have successfully Complete Your order. You have earned ${orderDetails.deliveryFee} Taka`,
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSendNote = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/order/update-order/${orderId}`,
        {
          customerNotes: note,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Note Send Successfully",
        text: "You have successfully Add your note.",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/order/update-order/${orderId}`,
        {
          review: feedback,
          rating: rating,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Rating",
        text: "You have successfully Add your Review.",
      });
      // Add your submit logic here (e.g., API call)
      navigate("/");
      // window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderActionButtons = () => {
    switch (role) {
      case "Rider":
        return (
          <div className="flex gap-2">
            {orderDetails?.status === "accepted_by_rider" && (
              <Button
                color="success"
                className="w-full"
                onClick={() => handleDelivered(orderId)}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Delivered
              </Button>
            )}
          </div>
        );

      case "Seller":
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
              <Button
                color="success"
                className="w-full"
                onClick={() => handleSendNote(orderId)}
              >
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
              <Clipboard
                label="copy"
                className="bg-gray-400 p-1"
                valueToCopy={orderDetails?.sellerId?.phone}
              />
              <p className="mt-2">{orderDetails?.customerNotes}</p>
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
              <div className="flex items-center gap-2">
                <p>{orderDetails?.studentId?.phone}</p>
                <Clipboard
                  label="copy"
                  className="bg-gray-400 p-1"
                  valueToCopy={orderDetails?.studentId?.phone}
                />
              </div>
              <p className="mt-2">{orderDetails?.customerNotes}</p>
            </div>
          </div>
        );
    }
  };

  if (loading || !riderCurrentLocation)
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
              {orderDetails.status === "completed" ? null : (
                <Distance
                  dLat={orderDetails.deliveryAddress.lat}
                  dLng={orderDetails.deliveryAddress.lang}
                  rLat={riderCurrentLocation?.lat || 0}
                  rLng={riderCurrentLocation?.lng || 0}
                />
              )}
            </div>
          )}
        </div>

        <div className="mt-6">{renderActionButtons()}</div>
      </Card>
      {role === "Student" && orderDetails.status === "completed" && (
        <Modal
          handleModalClose={() => navigate("/")}
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
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
              <Button onClick={handleSubmit} async color="blue">
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RiderCurrentDelivery;
