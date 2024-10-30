import React from "react";

const StudentOrder = () => {
  const allOrders = [
    {
      orderId: 1,
      date: "2024-10-29",
      status: "Delivered",
      items: [
        { name: "Grilled Salmon", price: 18.0, quantity: 1 },
        { name: "Chocolate Cake", price: 7.0, quantity: 2 },
      ],
    },
    {
      orderId: 2,
      date: "2024-10-28",
      status: "In Progress",
      items: [
        { name: "Spaghetti Carbonara", price: 15.0, quantity: 2 },
        { name: "Garlic Bread", price: 6.0, quantity: 3 },
      ],
    },
    {
      orderId: 3,
      date: "2024-10-26",
      status: "Cancelled",
      items: [
        { name: "Caesar Salad", price: 12.0, quantity: 1 },
        { name: "Mushroom Risotto", price: 14.0, quantity: 1 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 lg:px-40">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Order History</h1>

      <div className="space-y-8">
        {allOrders.map((order) => {
          const subtotal = order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          const tax = subtotal * 0.05;
          const total = subtotal + tax;

          return (
            <div key={order.orderId} className="bg-white p-6 shadow-lg rounded-lg">
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">Order #{order.orderId}</h2>
                  <p className="text-gray-600">Date: {order.date}</p>
                  <p className={`text-${order.status === 'Delivered' ? 'green' : order.status === 'Cancelled' ? 'red' : 'yellow'}-500 font-semibold`}>
                    {order.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">Total: ${total.toFixed(2)}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 border-b border-gray-200"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-gray-700 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentOrder;
