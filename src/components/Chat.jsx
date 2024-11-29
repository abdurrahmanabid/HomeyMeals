import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // for the send icon
import SetLocation from "./SetLocation";

// Sample Data (replace with actual data from the backend)
const orderDetails = {
  studentName: "John Doe",
  studentPhone: "123-456-7890",
  foodItems: [
    { name: "Pizza", quantity: 1, price: 10 },
    { name: "Soda", quantity: 2, price: 2 },
  ],
  address: "123 Main St, Dhaka",
  notes: "Please be careful with the delivery. Knock before leaving.",
};

const RiderOrderTracking = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "student", text: "Hi, when will the delivery arrive?" },
    { sender: "rider", text: "I will be there in 10 minutes." },
  ]);

  useEffect(() => {
    // Fetch existing chat messages here (for example, through an API)
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: "rider", text: message }]);
      setMessage("");
      // Here, send the message to the backend to save in the database.
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>

      <div className="bg-white p-6 rounded-lg shadow-xl mb-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Student: {orderDetails.studentName}
        </h2>
        <p className="text-gray-600 mb-2">
          <strong className="text-gray-800">Phone:</strong>{" "}
          {orderDetails.studentPhone}
        </p>
        <p className="text-gray-600 mb-2">
          <strong className="text-gray-800">Address:</strong>{" "}
          {orderDetails.address}
        </p>
        <p className="text-gray-600 mb-4">
          <strong className="text-gray-800">Notes:</strong> {orderDetails.notes}
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Order Details:
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          {orderDetails.foodItems.map((item, index) => (
            <li key={index} className="flex justify-between text-gray-700">
              <span>
                {item.quantity} x {item.name}
              </span>
              <span className="text-blue-600 font-semibold">
                ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between items-center text-gray-800">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold text-green-600">
            $
            {orderDetails.foodItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
      </div>
      <SetLocation/>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Chat with Student</h2>

        <div className="h-60 overflow-y-scroll border p-4 rounded-lg bg-gray-50 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${msg.sender === "rider" ? "text-right" : ""}`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === "rider"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 rounded-l-lg border border-gray-300"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiderOrderTracking;
