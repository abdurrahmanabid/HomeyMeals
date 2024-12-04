import React, { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import Taka from "../../components/Taka";

const StudentCheckout = () => {
  const [orderData, setOrderData] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    cvv: "",
    saveCard: false,
    shippingMethod: "Cash on Delivery", // Default method
    deliveryAddress: "", // Add this if it isn't already in your state
  });

  useEffect(() => {
    const storedOrderData = localStorage.getItem("selectedItems");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData)); // Set the order data from localStorage
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateTotalPrice = () => {
    return orderData
      .reduce((total, item) => total + parseFloat(item.totalPrice), 0)
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine formData with order data and total price
    const checkoutData = {
      ...formData,
      orderItems: orderData,
      totalPrice: calculateTotalPrice(),
    };

    console.log("Checkout Data:", checkoutData);
    alert("Checkout data logged to console!");
  };

  return (
    <div>
      <div className="flex flex-col mb-5 items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32 text-xl font-bold">
        Checkout Orders
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">{/* Steps Section */}</div>
        </div>
      </div>
      <div className="grid mb-8 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Order Summary Section */}
        <div className="px-4 pt-8">
          <p className="text-2xl font-semibold mb-4">Order Summary</p>
          {orderData.length === 0 ? (
            <p className="text-gray-400">No items selected</p>
          ) : (
            <div>
              {orderData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 mb-4 border-b border-gray-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {item.price} x {item.quantity} = {item.totalPrice}{" "}
                      <Taka />
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 border-t border-gray-300">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total Price</span>
                  <span className="text-xl font-semibold text-green-600">
                    {calculateTotalPrice()} <Taka />
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Shipping Methods */}
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="shippingMethod"
                value="Cash on Delivery"
                checked={formData.shippingMethod === "Cash on Delivery"}
                onChange={handleInputChange}
              />
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <FaHandshake
                  className="w-14 object-contain border bg-accent5 h-full p-1 rounded-lg text-secondary border-accent2"
                  size={30}
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cash on Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 20 minutes
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="shippingMethod"
                value="Fedex Delivery"
                checked={formData.shippingMethod === "Fedex Delivery"}
                onChange={handleInputChange}
              />
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <IoHomeOutline
                  className="w-14 object-contain border bg-accent5 h-full p-1 rounded-lg text-secondary border-accent2"
                  size={30}
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        {/* Payment Details Section */}
        <div className="mt-10 border border-gray-300 rounded-lg bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label
              htmlFor="deliveryAddress"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Delivery Address
            </label>
            <textarea
              id="deliveryAddress"
              name="deliveryAddress"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your delivery address"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentCheckout;
