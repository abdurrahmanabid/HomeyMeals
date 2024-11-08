import React, { useEffect, useState } from "react";
import Taka from "../../components/Taka";

const StudentCheckout = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const storedOrderData = localStorage.getItem("selectedItems");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData)); // Set the order data from localStorage
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the order logic
    console.log("Order submitted");
  };

  const calculateTotalPrice = () => {
    return orderData
      .reduce((total, item) => total + parseFloat(item.totalPrice), 0)
      .toFixed(2);
  };
  return (
    <div>
      <div className="flex flex-col mb-5 items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Checkout Orders
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                  aria-label="Shop Step"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                  aria-label="Shipping Step"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                  aria-label="Payment Step"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid mb-8 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Order Summary Section */}
        <div className="px-4 pt-8">
          <p className="text-2xl font-semibold mb-4">Order Summary</p>
          <p className="text-gray-500 mb-6">
            Check your items and select a suitable shipping method.
          </p>

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
                      <p className="text-sm text-gray-500">{item.size}</p>
                      <p className="text-sm text-gray-500">
                        <span>Quantity :</span>
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {item.price} x {item.quantity}={item.totalPrice} <Taka/>
                    </p>
                  </div>
                </div>
              ))}
              {/* Total Price */}
              <div className="mt-4 p-4 border-t border-gray-300">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total Price</span>
                  <span className="text-xl font-semibold text-green-600">
                    {calculateTotalPrice()} <Taka/>
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Shipping Methods Section */}
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                defaultChecked
              />
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt="Fedex Delivery"
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
              />
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt="Fedex Delivery"
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
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <form>
            {/* Email Field */}
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
            />

            {/* Card Holder Field */}
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <input
              type="text"
              id="card-holder"
              name="card-holder"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
            />

            {/* Card Number Field */}
            <label
              htmlFor="card-number"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              name="card-number"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
            />

            {/* Expiration Date Field */}
            <label
              htmlFor="expiry-date"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Expiration Date
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="expiry-month"
                name="expiry-month"
                className="w-1/2 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM"
              />
              <input
                type="text"
                id="expiry-year"
                name="expiry-year"
                className="w-1/2 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="YY"
              />
            </div>

            {/* CVV Field */}
            <label
              htmlFor="cvv"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              placeholder="123"
            />

            {/* Save Card Checkbox */}
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="save-card"
                name="save-card"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="save-card" className="ml-2 text-sm text-gray-600">
                Save card details for future purchases
              </label>
            </div>

            {/* Submit Button */}
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
