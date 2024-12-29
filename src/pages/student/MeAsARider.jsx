import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Distance from "../../components/Distance";
import HomeyMealsLoader from "../../components/HomeyMealsLoader";
import LocationDisplay from "../../components/LocationDisplay";

const MeAsARider = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
    const handleDelivered = async () => {
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
          text: `You have successfully Complete Your order.`,
        }).then(() => {
          navigate("/");
        });
        const studentNotification = await axios.post(
          `http://localhost:8000/api/notification/add-notification`,
          {
            userId: orderDetails.studentId._id,
            title: "Delivery Completed",
            message: `Hi ${orderDetails.studentId.fullName}, Your order has been successfully completed.`,
          }
        );
        const sellerNotification = await axios.post(
          `http://localhost:8000/api/notification/add-notification`,
          {
            userId: orderDetails.sellerId._id,
            title: "Meal Delivered",
            message: `Hi ${orderDetails.sellerId.fullName}, Your meal has been successfully delivered to ${orderDetails.studentId.fullName}.`,
          }
        );
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const orderResponse = await fetch(
          `http://localhost:8000/api/order/get-a-order/${orderId}`
        );
        const orderData = await orderResponse.json();
        setOrderDetails(orderData);

        const [studentResponse, sellerResponse] = await Promise.all([
          fetch(
            `http://localhost:8000/api/profile/get/${orderData.studentId._id}`
          ),
          fetch(
            `http://localhost:8000/api/profile/get/${orderData.sellerId._id}`
          ),
        ]);

        const studentData = await studentResponse.json();
        console.log("🚀 ~ fetchAllData ~ studentData:", studentData.profile)
        const sellerData = await sellerResponse.json();

        setStudentProfile(studentData.profile);
        setSellerProfile(sellerData.profile);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [orderId]);

  if (loading) {
    return (
      <HomeyMealsLoader/>
    );
  }

  const getStatusBadgeColor = (status) => {
    const statusColors = {
      accepted: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      {/* Order Header */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
              Self-Pickup Order #{orderId.slice(-6)}
            </h5>
            <p className="text-sm text-gray-500">
              {new Date(orderDetails.orderDate).toLocaleString()}
            </p>
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(
              orderDetails.status === "accepted_by_rider"
                ? "accepted"
                : orderDetails.status
            )}`}
          >
            {orderDetails.status.split("_")[0].toUpperCase()}
          </span>
        </div>
        {/* Distance Component */}
          <Distance
            dLat={sellerProfile.lat}
            dLng={sellerProfile.lng}
            rLat={studentProfile.lat}
            rLng={studentProfile.lng}
          />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Student Details */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={studentProfile?.profilePicture || "/api/placeholder/48/48"}
              alt="Student profile"
            />
            <div>
              <h5 className="text-xl font-bold text-gray-900">
                Student Information
              </h5>
              <p className="text-sm text-gray-500">
                {orderDetails.studentId.fullName}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Email:</span>{" "}
              {orderDetails.studentId.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Phone:</span>{" "}
              {orderDetails.studentId.phone}
            </p>
            <p className="text-sm">
              <span className="font-medium">
                Location:
                <LocationDisplay
                  lat={studentProfile.lat}
                  lng={studentProfile.lng}
                />
              </span>{" "}
            </p>
          </div>
        </div>

        {/* Seller Details */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={sellerProfile?.profilePicture || "/api/placeholder/48/48"}
              alt="Seller profile"
            />
            <div>
              <h5 className="text-xl font-bold text-gray-900">
                Pickup Location (Seller)
              </h5>
              <p className="text-sm text-gray-500">
                {orderDetails.sellerId.fullName}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Contact:</span>{" "}
              {orderDetails.sellerId.phone}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span>{" "}
              {orderDetails.sellerId.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">
                My Location:
                <LocationDisplay
                  lat={sellerProfile.lat}
                  lng={sellerProfile.lng}
                />
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="text-xl font-bold text-gray-900 mb-4">Pickup Details</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h6 className="text-lg font-semibold mb-2">Payment Information</h6>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Payment Method:</span>{" "}
                {orderDetails.paymentMethod}
              </p>
              <p className="text-sm">
                <span className="font-medium">Payment Status:</span>{" "}
                {orderDetails.paymentStatus}
              </p>
              <p className="text-sm">
                <span className="font-medium">Total Amount:</span> $
                {orderDetails.totalPrice}
              </p>
            </div>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-2">Pickup Instructions</h6>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Type:</span> Student Self-Pickup
              </p>
              {orderDetails.customerNotes && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Additional Notes:</p>
                  <p className="text-sm text-gray-600">
                    {orderDetails.customerNotes}
                  </p>
                </div>
              )}
              <div className="flex justify-center mt-6">
                <Button color="dark" size="md" onClick={handleDelivered}>
                  Pick Your Meal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeAsARider;
