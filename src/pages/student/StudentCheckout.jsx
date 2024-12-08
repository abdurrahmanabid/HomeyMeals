import React, { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomLocation from "../../components/CustomLocation";
import Modal from "../../components/Modal";
import { calculateDistance } from "../../functions/calculateDistance";


// Constants
const SHIPPING_METHODS = [
  {
    value: "Cash on Delivery",
    label: "Cash on Delivery",
    icon: <FaTruck />,
    description: "Set delivery location",
  },
  {
    value: "Self Shipping",
    label: "Self Shipping",
    icon: <FaMapMarkerAlt />,
    description: "Pickup from seller",
  },
];

const SELLER_LOCATION = { lat: 22.3456, lng: 91.7789 };

const StudentCheckout = () => {
  const [orderData, setOrderData] = useState([]);
  const [mapModal, setMapModal] = useState(false);
  const [mapDetails, setMapDetails] = useState(null);
  const [distance, setDistance] = useState(0);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    shippingMethod: "Self Shipping", // Default to "Self Shipping"
    shippingCharge: 0, // No charge for self-shipping
    fullName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const storedOrderData = localStorage.getItem("selectedItems");
    if (storedOrderData) setOrderData(JSON.parse(storedOrderData));
  }, []);

  useEffect(() => {
    if (mapDetails && formData.shippingMethod === "Cash on Delivery") {
      const calculatedDistance = calculateDistance(
        SELLER_LOCATION.lat,
        SELLER_LOCATION.lng,
        mapDetails.lat,
        mapDetails.lng
      );
      const roundedDistance = Math.round(calculatedDistance);

      setDistance(roundedDistance);
      setFormData((prev) => ({
        ...prev,
        distance: roundedDistance,
        shippingCharge: Math.max(roundedDistance * 10, 50), // Minimum charge: 50
      }));
    } else if (formData.shippingMethod === "Self Shipping") {
      setDistance(0);
      setFormData((prev) => ({
        ...prev,
        distance: 0,
        shippingCharge: 0,
      }));
    }
  }, [mapDetails, formData.shippingMethod]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "shippingMethod") {
      if (value === "Cash on Delivery") {
        setMapModal(true); // Open modal for location selection
      } else {
        setMapDetails(null); // Reset map details for "Self Shipping"
      }
    }
  }, []);

  const calculateTotalPrice = useCallback(() => {
    const itemsTotal = orderData.reduce(
      (total, item) => total + parseFloat(item.totalPrice),
      0
    );
    return (itemsTotal + formData.shippingCharge).toFixed(2);
  }, [orderData, formData.shippingCharge]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkoutData = {
      ...formData,
      orderItems: orderData,
      totalPrice: calculateTotalPrice(),
      studentLocation : mapDetails,
    };
    console.log("Checkout Data:", checkoutData);
    navigate('../cash-memo', {state: checkoutData})
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-secondary text-white p-6">
          <h1 className="text-3xl font-bold flex items-center">
            <FaCheckCircle className="mr-4" size={36} />
            Complete Your Order
          </h1>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">
              Order Summary
            </h2>
            {orderData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 border-b"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-500">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">{item.totalPrice} Taka</p>
              </div>
            ))}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  {orderData.reduce(
                    (total, item) => total + parseFloat(item.totalPrice),
                    0
                  )}{" "}
                  Taka
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-secondary">
                  {formData.shippingCharge} Taka <span className="text-red-500">{distance>0&&<span className="text-red-500">({distance} km)</span>}</span>
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total</span>
                <span className="text-green-600">
                  {calculateTotalPrice()} Taka 
                </span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">
              Shipping & Payment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded"
                />
              </div>

              {/* Shipping Method */}
              <div>
                <h3 className="font-semibold mb-2">Shipping Method</h3>
                <div className="grid gap-4">
                  {SHIPPING_METHODS.map((method, idx) => (
                    <label
                      key={idx}
                      className={`border p-4 rounded flex items-center ${
                        formData.shippingMethod === method.value
                          ? "border-secondary"
                          : ""
                      }`}
                    >
                      {method.icon}
                      <div className="ml-4">
                        <p>{method.label}</p>
                        <p className="text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.value}
                        checked={formData.shippingMethod === method.value}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {mapModal && (
        <Modal onClose={() => setMapModal(false)}>
          <CustomLocation
            setLocation={(location) => {
              setMapDetails(location);
              setMapModal(false); // Close the modal
            }}
          />
        </Modal>
      )}
    </div>
  );
};


export default StudentCheckout;
