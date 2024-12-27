import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Taka from "../../components/Taka";
import useAuth from "../../utils/useAuth";
import HomeyMealsLoader from './../../components/HomeyMealsLoader';
import NothingFound from './../../components/NothingFound';

const StudentCart = () => {
  const user = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchItemForCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/user/${user.id}`
      );

      const items = Array.isArray(response.data)
        ? response.data
        : response.data?.data
        ? response.data.data
        : response.data
        ? [response.data]
        : [];

      setCartItems(items);
      console.log("🚀 ~ fetchItemForCart ~ items:", items)
    } catch (error) {
      console.error("Error fetching cart items:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load cart items. Please try again.",
      });
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/cart/remove/${id}`
      );
      Swal.fire({
        icon: "success",
        title: "Item Removed",
        text: response.data.message,
      });
      fetchItemForCart();
      setSelectedItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue removing the item.",
      });
    }
  };

  const handleCheckboxChange = (e, item) => {
    setSelectedItems((prev) => {
      if (e.target.checked) {
        return [...prev, item];
      } else {
        return prev.filter((selectedItem) => selectedItem._id !== item._id);
      }
    });
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Items Selected",
        text: "Please select at least one item to proceed to checkout.",
      });
      return;
    }

    const checkoutData = selectedItems.map((item) => ({
      itemId: item._id,
      sellerId: item.meal.sellerId,
      mealId: item.meal._id,
      quantity: item.quantity,
      price: item.totalAmount,
      name: item.meal.itemName,
      image: item.meal.image,
      description: item.meal.description,
    }));

    navigate("/student/checkout", {
      state: {
        items: checkoutData,
        totalAmount: calculateTotalPrice(),
      },
    });
  };

  useEffect(() => {
    if (user?.id) {
      fetchItemForCart();
    }
  }, [user?.id]);

  const calculateTotalPrice = () => {
    return selectedItems
      .reduce((total, item) => total + (item.totalAmount || 0), 0)
      .toFixed(2);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-gray-500 mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Please Log In</h2>
          <p>You need to be logged in to view your cart.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <HomeyMealsLoader/>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-8 sm:p-8 lg:px-28">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Cart
      </h1>

      {!Array.isArray(cartItems) || cartItems.length === 0 ? (
        <NothingFound message="No items in cart" onAction={()=>navigate("/student/menu")} buttonLabel="Explore Menu" />
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-5 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <input
                type="checkbox"
                className="mr-4 h-5 w-5 text-blue-600 rounded focus:ring-0 cursor-pointer"
                checked={selectedItems.some(
                  (selectedItem) => selectedItem._id === item._id
                )}
                onChange={(e) => handleCheckboxChange(e, item)}
              />
              <img
                src={item.meal.image}
                alt={item.meal.itemName}
                className="w-20 h-20 object-cover rounded-md shadow-sm"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.meal.itemName}
                </h2>
                <p className="text-sm text-gray-600">{item.meal.description}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {item.meal.category || "Category not specified"}
                </p>
                <p className="text-xs text-gray-500">
                  Status:{" "}
                  <span className="font-medium">{item.meal.status}</span>
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="text-gray-700 font-medium">
                  Quantity: {item.quantity}
                </p>
                <p className="flex items-center text-green-600 font-bold">
                  <Taka />
                  <span className="ml-1">{item.totalAmount}</span>
                </p>

                {item.meal.discountPrice && (
                  <p className="flex items-center text-sm text-red-500">
                    <span>Discount:</span>
                    <span className="flex items-center ml-2">
                      <Taka />
                      <span className="ml-1">{item.meal.discountPrice}</span>
                    </span>
                  </p>
                )}
              </div>
              <button
                className="text-red-500 font-medium hover:text-red-700 ml-4 transition-colors duration-200"
                onClick={() => handleRemoveItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-8 p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">
              Total Price:
            </span>
            <span className="flex items-center text-xl font-semibold text-green-600">
              <Taka />
              <span className="ml-1">{calculateTotalPrice()}</span>
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentCart;
