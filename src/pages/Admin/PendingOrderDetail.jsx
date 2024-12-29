import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { calculateDistance } from "../../functions/calculateDistance";
import LocationDisplay from "./../../components/LocationDisplay";

const PendingOrderDetails = ({ order, fullAddress, onClose }) => {
  console.log("🚀 ~ PendingOrderDetails ~ order:", order)
  const [profile, setProfile] = useState(null);
  const [loading, setPendingLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [riders, setRiders] = useState([]);
  const [riderModalOpen, setRiderModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(value);

  useEffect(() => {
    const fetchUsersProfile = async () => {
      if (!order?.sellerId?._id) return;
      try {
        const response = await axios.get(`http://localhost:8000/api/profile/get/${order.sellerId._id}`);
        setProfile(response.data?.profile);
        setPendingLoading(false);
      } catch (err) {
        setError("Failed to fetch profile.");
        setPendingLoading(false);
      }
    };
    if (order) {
      fetchUsersProfile();
    }
  }, [order?.sellerId?._id]);

  const fetchRiders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/profile/getAllProfiles");
      const profiles = response.data.data;
      const ridersList = profiles.filter((profile) => profile.userId?.role === "Rider");
      setRiders(ridersList);
      setRiderModalOpen(true);
    } catch (err) {
      console.error("Error fetching riders:", err);
      Swal.fire("Error", "Failed to fetch riders.", "error");
    }
  };

  const handleAssignRider = async () => {
    if (!selectedRider) {
      Swal.fire("Warning", "Please select a rider.", "warning");
      return;
    }

    setAssigning(true);
    try {
      const response = await axios.get("http://localhost:8000/api/order/get-all-order");
      const orders = response.data;

      const isBusy = orders.some(
        (order) => order.riderId?._id === selectedRider.userId._id && order.status === "accepted_by_rider"
      );

      if (isBusy) {
        Swal.fire("Info", "This rider is currently busy with another delivery.", "info");
        setAssigning(false);
        return;
      }

      await axios.put(`http://localhost:8000/api/order/update-order/${order._id}`, {
        riderId: selectedRider.userId._id,
        status: "assigned_to_rider",
      });
      await axios.post(
        `http://localhost:8000/api/notification/add-notification`,
        {
          userId: selectedRider.userId._id,
          title: "New Order",
          message: `New Order Arrived, Get Ready For Ride.`,
        }
      );
      await axios.post(
        `http://localhost:8000/api/notification/add-notification`,
        {
          userId: order.sellerId,
          title: "Rider is Coming",
          message: `To take of your delicious food rider is coming`,
        }
      );

      Swal.fire("Success", "Rider assigned successfully!", "success");
      setRiderModalOpen(false);

      // Call the parent component's onClose method to close the modal
      if (onClose) onClose();
    } catch (err) {
      console.error("Error assigning rider:", err);
      Swal.fire("Error", "Failed to assign rider.", "error");
    } finally {
      setAssigning(false);
    }
  };

  if (!order) return <div>No order details available.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">General Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Order ID:</strong> {order._id || "N/A"}</p>
          <p><strong>Status:</strong> {order.status || "N/A"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <p><strong>Exact Address:</strong> {fullAddress || "Loading address..."}</p>
      </div>

      {order.sellerId && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Seller Information</h3>
          <p><strong>Name:</strong> {order.sellerId.fullName || "N/A"}</p>
          <p><strong>Email:</strong> {order.sellerId.email || "N/A"}</p>
          <p><strong>Phone:</strong> {order.sellerId.phone || "N/A"}</p>
          <p><strong>Address:</strong> 
            <LocationDisplay lat={profile?.lat} lng={profile?.lng} />
          </p>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={fetchRiders}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Assign Rider
        </button>
      </div>

      {/* Rider Selection Modal */}
      <Modal
        show={riderModalOpen}
        onClose={() => setRiderModalOpen(false)}
      >
        <Modal.Header>Select a Rider</Modal.Header>
        <Modal.Body>
          {riders.length > 0 ? (
            <ul className="space-y-4">
              {riders.map((rider) => (
                <li
                  key={rider._id}
                  className={`p-4 border rounded cursor-pointer ${
                    selectedRider?._id === rider._id ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedRider(rider)}
                >
                  <p><strong>Name:</strong> {rider.userId?.fullName || "N/A"}</p>
                  <p><strong>Email:</strong> {rider.userId?.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {rider.userId?.phone || "N/A"}</p>
                  <p><strong>Distance from seller:</strong> {Math.ceil(
                    calculateDistance(
                      profile.lat,
                      profile.lng,
                      rider.lat,
                      rider.lng
                    )
                  )} km</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No riders found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleAssignRider}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            disabled={!selectedRider || assigning}
          >
            {assigning ? "Assigning..." : "Confirm"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PendingOrderDetails;
