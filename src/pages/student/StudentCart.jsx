import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    
    const savedSelectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(savedSelectedItems);

  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckboxChange = (e, item) => {
    let updatedSelectedItems = [...selectedItems];
    if (e.target.checked) {
      updatedSelectedItems.push(item);
    } else {
      updatedSelectedItems = updatedSelectedItems.filter(selectedItem => selectedItem.id !== item.id);
    }
    setSelectedItems(updatedSelectedItems);
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
  };

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      navigate("/student/checkout");
    } else {
      alert("Please select at least one item to proceed to checkout.");
    }
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + (item.totalPrice || 0), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-8 sm:p-8 lg:px-28">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <input
                type="checkbox"
                className="mr-4 h-5 w-5 text-blue-600 rounded focus:ring-0 cursor-pointer"
                checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                onChange={(e) => handleCheckboxChange(e, item)}
              />

              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md shadow-sm"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {item.category || "Category not specified"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-700 font-medium mr-4">
                  Quantity: {item.quantity || 1}
                </p>
                <p className="text-green-600 font-bold text-lg">
                  ${item.totalPrice || "Price not available"}
                </p>
              </div>
              <button
                className="text-red-500 font-medium hover:text-red-700 ml-4 transition-colors duration-200"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-8 p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total Price:</span>
            <span className="text-xl font-semibold text-green-600">${calculateTotalPrice()}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
      )}
    </div>
  );
};

export default StudentCart;
