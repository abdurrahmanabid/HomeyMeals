import axios from "axios";
import React, { useEffect, useState } from "react";
import ErrorPage from "../../components/ErrorPage";
import HomeyMealsLoader from "../../components/HomeyMealsLoader";
import NothingFound from "../../components/NothingFound";
import useAuth from "../../utils/useAuth";
import SellerOrderCard from "./../../components/SellerOrderCard";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/order/get-order",
          {
            params: {
              role: "seller", // Replace with dynamic role if needed
              roleId: id, // Replace with dynamic roleId
            },
          }
        );
        setOrders(response.data); // Assuming response.data contains the orders
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to run only once on mount

  if (loading) return <HomeyMealsLoader/>;
  if (error)
    return <ErrorPage code="404" title="Failed to fetch orders" message={error} />;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Seller Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => <SellerOrderCard key={order.id} order={order} />)
      ) : (<NothingFound/>
      )}
    </div>
  );
};

export default SellerOrders;
