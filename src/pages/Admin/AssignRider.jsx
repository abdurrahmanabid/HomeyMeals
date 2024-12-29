import axios from "axios";
import { Modal } from "flowbite-react"; // Import Flowbite's Modal component
import React, { useEffect, useState } from "react";
import PendingOrderDetails from "../Admin/PendingOrderDetail";
import HomeyMealsLoader from './../../components/HomeyMealsLoader';
import NothingFound from './../../components/NothingFound';

const AssignRider = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addresses, setAddresses] = useState({}); // Store addresses for each order

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/order/get-all-order");
        const filteredOrders = response.data.filter(order =>
          ["cancelled_by_rider", "in_progress"].includes(order.status)
        );
        setOrders(filteredOrders);

        // Fetch addresses for all orders
        const fetchedAddresses = {};
        for (const order of filteredOrders) {
          const { lat, lang } = order.deliveryAddress || {};
          if (lat && lang) {
            fetchedAddresses[order._id] = await fetchAddress(lat, lang);
          } else {
            fetchedAddresses[order._id] = "Address not available";
          }
        }
        setAddresses(fetchedAddresses);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          lat,
          lon: lng,
          format: "json",
        },
      });
      return response.data.display_name;
    } catch (err) {
      console.error("Failed to fetch address:", err);
      return "Address not found";
    }
  };

  const handleViewDetails = (order) => {
    const address = addresses[order._id] || "Fetching address...";
    setSelectedOrder({ ...order, fullAddress: address });
  };

  if (loading) return <HomeyMealsLoader/>
  if (error) return <NothingFound message="No Pending Items"/>;

  return (
    <div className="container mx-auto p-6 min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center mt-6">No orders found.</div>
      ) : (
        <table className="table-auto w-full text-left border-collapse border border-gray-200 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Items</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{order._id}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded ${
                      order.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {order.items.map(item => item.itemId.itemName).join(", ")}
                </td>
                <td className="px-4 py-2 border">
                  {addresses[order._id] || "Fetching address..."}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Render Modal for PendingOrderDetails */}
      <Modal
        show={!!selectedOrder} // Show modal if selectedOrder is not null
        onClose={() => setSelectedOrder(null)} // Close modal when clicking outside or on the close button
        size="5xl"
      >
        <Modal.Header>Order Details</Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <PendingOrderDetails
              order={selectedOrder}
              fullAddress={selectedOrder.fullAddress} 
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssignRider;
