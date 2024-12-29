import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaTruck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomLocation from "../../components/CustomLocation";
import Modal from "../../components/Modal";
import { calculateDistance } from "../../functions/calculateDistance";
import getPlaceName from "../../functions/getPlaceName";
import useAuth from "../../utils/useAuth";

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

const StudentCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useAuth();
  const { items = [] } = location.state || {};
  const copyItems = [...items];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    shippingMethod: "",
    distance: 0,
    shippingCharge: 0,
    customerNotes: "",
  });
  const [mapModal, setMapModal] = useState(false);
  const [mapDetails, setMapDetails] = useState(null);
  const [placeName, setPlaceName] = useState("Fetching Location...");
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    if (items.length > 0 && currentOrderIndex < items.length) {
      setSelectedProduct(items[currentOrderIndex]);
      console.log("Selected Product:", items[currentOrderIndex]);
      const sellerId = items[currentOrderIndex].sellerId;
      axios.get(`http://localhost:8000/api/profile/get/${sellerId}`).then((res) => {
        setSeller(res.data.profile);
        console.log("🚀 ~ axios.get ~ res.data:", res.data.profile)
      }).catch((err) => {
        console.error("Error fetching seller:", err);
      });
    }
  }, [items, currentOrderIndex]);

  useEffect(() => {
    const fetchPlaceName = async () => {
      if (mapDetails?.lat && mapDetails?.lng) {
        try {
          const name = await getPlaceName(mapDetails.lat, mapDetails.lng);
          setPlaceName(name);
        } catch (error) {
          console.error("Failed to fetch place name:", error);
          setPlaceName("Location");
        }
      }
    };

    if (mapDetails) {
      fetchPlaceName();
      if (formData.shippingMethod === "Cash on Delivery") {
        const calculatedDistance = calculateDistance(
          seller.lat,
          seller.lng,
          mapDetails.lat,
          mapDetails.lng
        );
        const roundedDistance = Math.round(calculatedDistance);
        setFormData((prev) => ({
          ...prev,
          distance: roundedDistance,
          shippingCharge: Math.max(roundedDistance * 10, 50), // Minimum 50 Taka
        }));
      }
    }
  }, [mapDetails, formData.shippingMethod]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "shippingMethod") {
      if (value === "Cash on Delivery") {
        setMapModal(true);
      } else {
        setMapDetails(null);
        setFormData((prev) => ({
          ...prev,
          distance: 0,
          shippingCharge: 0,
        }));
      }
    }
  }, []);

  const calculateTotalPrice = useCallback(() => {
    if (!selectedProduct) return 0;
    return (
      parseFloat(selectedProduct.price) + formData.shippingCharge
    ).toFixed(2);
  }, [selectedProduct, formData.shippingCharge]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/api/order/order-item", {
          studentId: id,
          sellerId: selectedProduct.sellerId,
          items: {
            itemId: selectedProduct.mealId,
            quantity: selectedProduct.quantity,
          },
          deliveryAddress: {
            lat: mapDetails?.lat || seller.lat,
            lang: mapDetails?.lng || seller.lng,
          },
          totalPrice: calculateTotalPrice(),
          status: "pending",
          paymentMethod: formData.shippingMethod.includes("Cash")
            ? "cash_on_delivery"
            : "self-shipping",
          customerNotes: formData.customerNotes,
          deliveryFee: formData.shippingCharge,
          paymentStatus: "pending",
        })
        .then((res) => {
          //now delete from cart
          axios
            .delete(
              `http://localhost:8000/api/cart/remove/${selectedProduct.itemId}`
            )
            .then((res) => {
              console.log("Item removed from cart:", res.data);
            });
          // Swal with product name and which number of product is ordered
          Swal.fire({
            icon: "success",
            title: "Order Placed",
            text: `${selectedProduct.name} ordered successfully!`,
          });
        });
        const notificationRes = await axios.post(
          `http://localhost:8000/api/notification/add-notification`,
          {
            userId: id,
            title: "Order Placed",
            message: `You have successfully placed an order for ${selectedProduct.name}`,
          }
        );
        const sellerNotification = await axios.post(
          `http://localhost:8000/api/notification/add-notification`,
          {
            userId: selectedProduct.sellerId,
            title: "New Order",
            message: `You have received a new order for ${selectedProduct.name}.`,
          }
        );
        console.log("🚀 ~ handleSubmit ~ notificationRes:", notificationRes)

      if (currentOrderIndex < items.length - 1) {
        setCurrentOrderIndex((prev) => prev + 1);
        setFormData((prev) => ({
          ...prev,
          shippingMethod: "",
          distance: 0,
          shippingCharge: 0,
        }));
        setMapDetails(null);
      } else {
        // navigate("/orders");
        navigate("../cash-memo", { state: copyItems });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue placing your order.",
      });
    }
  };

  if (!selectedProduct) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-secondary text-white p-6 flex items-center justify-between">
          <button
            className="text-white font-bold hover:text-gray-200 p-2 rounded-full hover:bg-gray-700 transition-all"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack size={24} />
          </button>
          <h1 className="text-2xl font-bold flex items-center">
            <FaCheckCircle className="mr-4" size={28} />
            Order Product {currentOrderIndex + 1} of {items.length}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">
              Order Summary
            </h2>
            <div className="flex justify-between items-center py-4 border-b">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-lg">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-gray-500">
                    Size: {selectedProduct.size} | Qty:{" "}
                    {selectedProduct.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">{selectedProduct.price} Taka</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  {selectedProduct.price} Taka
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-secondary">
                  {formData.shippingCharge} Taka
                  {formData.distance > 0 && (
                    <span className="text-green-500 ml-2">
                      ({formData.distance} km - {placeName})
                    </span>
                  )}
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

          {/* Shipping & Payment Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">
              Shipping & Payment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                        required
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                name="customerNotes"
                placeholder="Add any special notes..."
                value={formData.customerNotes}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                rows="3"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 w-full"
              >
                {currentOrderIndex < items.length - 1
                  ? "Place Order & Continue"
                  : "Place Final Order"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {mapModal && (
        <Modal onClose={() => setMapModal(false)}>
          <CustomLocation
            setLocation={(location) => {
              setMapDetails(location);
              setMapModal(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default StudentCheckout;
