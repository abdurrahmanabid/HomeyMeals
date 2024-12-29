import axios from "axios";
import { Badge, Card } from "flowbite-react";
import { Bell, Check, Clock, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuth from "./../utils/useAuth";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/notification/get/${id}`
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/notification/update/${notificationId}`,
        {
          isRead: true,
        }
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/notification/delete/${notificationId}`
      );
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-6 w-6 text-blue-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Notifications
            </h1>
          </div>
          {unreadCount > 0 && (
            <Badge color="blue" className="px-3 py-1.5 text-xs font-medium">
              {unreadCount} new message{unreadCount !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card className="text-center py-16">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-50 rounded-full mb-4">
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No notifications yet
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                When you get notifications, they'll show up here
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification._id}
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.isRead
                    ? "border-l-4 border-l-blue-500 bg-blue-50/30"
                    : "bg-white"
                }`}
              >
                <div className="flex items-start justify-between p-3 md:p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h2
                        className={`font-semibold truncate ${
                          notification.isRead
                            ? "text-gray-700"
                            : "text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </h2>
                      {!notification.isRead && (
                        <Badge color="blue" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Clock className="h-3 w-3 mr-1.5" />
                      {formatDate(notification.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4 shrink-0">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification._id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
