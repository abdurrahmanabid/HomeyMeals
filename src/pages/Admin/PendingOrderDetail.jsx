import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationDisplay from "../../components/LocationDisplay";

const PendingOrderDetails = ({ order, fullAddress }) => {
  console.log("🚀 ~ PendingOrderDetails ~ order:", order)
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);

  if (!order) return <div>No order details available.</div>;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(value);

  useEffect(() => {
    const fetchUsersProfile = async () => {
      if (!order?.sellerId?._id) {
        console.log("Seller ID not available.");
        setLoading(false);
        return; // Exit early if seller ID is not available
      }
      try {
        const response = await axios.get(`http://localhost:8000/api/profile/get/${order.sellerId._id}`);
        console.log("Profile fetched:", response.data?.profile); // Check the response
        setProfile(response.data?.profile);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err); // Log error
        setError("Failed to fetch profile.");
        setLoading(false);
      }
    };
    fetchUsersProfile();
  }, [order?.sellerId._id,]);


  console.log("🚀 ~ PendingOrderDetails ~ profile:", profile);

  if (loading) return <div>Loading...</div>
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">General Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Order ID:</strong> {order._id || "N/A"}</p>
          <p><strong>Status:</strong> {order.status || "N/A"}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus || "N/A"}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod || "N/A"}</p>
          <p><strong>Total Price:</strong> {formatCurrency(order.totalPrice || 0)}</p>
          <p><strong>Delivery Fee:</strong> {formatCurrency(order.deliveryFee || 0)}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <p><strong>Exact Address:</strong> {fullAddress || "Loading address..."}</p>
        <p><strong>Latitude:</strong> {order.deliveryAddress?.lat || "N/A"}</p>
        <p><strong>Longitude:</strong> {order.deliveryAddress?.lng || "N/A"}</p>
      </div>

      {order.studentId && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Customer Information</h3>
          <p><strong>Name:</strong> {order.studentId.fullName || "N/A"}</p>
          <p><strong>Email:</strong> {order.studentId.email || "N/A"}</p>
          <p><strong>Phone:</strong> {order.studentId.phone || "N/A"}</p>
        </div>
      )}

      {order.sellerId && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Seller Information</h3>
          <p><strong>Name:</strong> {order.sellerId.fullName || "N/A"}</p>
          <p><strong>Email:</strong> {order.sellerId.email || "N/A"}</p>
          <p><strong>Phone:</strong> {order.sellerId.phone || "N/A"}</p>
          <p><strong>Address:</strong> <LocationDisplay
                lat={profile.profile.lat}
                lng={profile.profile.lng}
              /></p>
        </div>
      )}

      {order.riderId && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Rider Information</h3>
          <p><strong>Name:</strong> {order.riderId.fullName || "N/A"}</p>
          <p><strong>Email:</strong> {order.riderId.email || "N/A"}</p>
          <p><strong>Phone:</strong> {order.riderId.phone || "N/A"}</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Order Items</h3>
        {order.items?.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.itemId?.itemName || "N/A"}</td>
                  <td className="border px-4 py-2">{item.itemId?.description || "N/A"}</td>
                  <td className="border px-4 py-2">{formatCurrency(item.itemId?.price || 0)}</td>
                  <td className="border px-4 py-2">{item.quantity || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default PendingOrderDetails;
