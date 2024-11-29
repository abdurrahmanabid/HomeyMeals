import React, { useEffect, useState } from "react";
import HomeyMealsLoader from "../../components/HomeyMealsLoader";

const RideerNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated API fetch
  const fetchNotifications = async () => {
    setLoading(true);
    // Simulate a delay
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          title: "New Order Assigned",
          description: "You have a new delivery assignment: Order #1234.",
          time: "5 mins ago",
          read: false,
        },
        {
          id: 2,
          title: "Order Delivered",
          description: "Order #1223 has been successfully delivered.",
          time: "2 hours ago",
          read: true,
        },
        {
          id: 3,
          title: "Payment Received",
          description:
            "You have received a payment of $25 for your recent delivery.",
          time: "1 day ago",
          read: true,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>

      {loading ? (
            <HomeyMealsLoader/>
      ) : notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications available.</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={markAllAsRead}
              className="text-blue-600 font-medium hover:underline"
            >
              Mark All as Read
            </button>
            <button
              onClick={clearNotifications}
              className="text-red-600 font-medium hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg shadow-md transition-all ${
                  notification.read
                    ? "bg-white hover:shadow-lg"
                    : "bg-blue-50 border border-blue-200 hover:shadow-lg"
                }`}
              >
                <div>
                  <h2
                    className={`text-lg font-semibold mb-2 ${
                      notification.read ? "text-gray-800" : "text-blue-700"
                    }`}
                  >
                    {notification.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    {notification.description}
                  </p>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring focus:ring-blue-200"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-600 text-sm font-medium hover:underline focus:outline-none focus:ring focus:ring-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RideerNotification;
