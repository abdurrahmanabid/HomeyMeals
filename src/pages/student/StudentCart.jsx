import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // To store selected items for checkout
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart data from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Retrieved Cart from Local Storage:", savedCart); // Debugging line
    setCartItems(savedCart);

    // Retrieve selected items data from localStorage
    const savedSelectedItems =
      JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(savedSelectedItems); // Restore previously selected items
  }, []);

  // Remove item from cart
  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (e, item) => {
    let updatedSelectedItems = [...selectedItems];

    if (e.target.checked) {
      updatedSelectedItems.push(item); // Add selected item to the array
    } else {
      updatedSelectedItems = updatedSelectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      ); // Remove unselected item from the array
    }

    setSelectedItems(updatedSelectedItems);
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems)); // Save selected items to localStorage
  };

  // Handle checkout for selected items
  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      navigate("/student/checkout");
    } else {
      alert("Please select at least one item to proceed to checkout.");
    }
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
              className="flex items-center justify-between p-5 bg-white shadow-md rounded-lg"
            >
              {/* Checkbox for selecting the item */}
              <input
                type="checkbox"
                className="mr-4"
                checked={selectedItems.some(
                  (selectedItem) => selectedItem.id === item.id
                )} // Check if item is selected
                onChange={(e) => handleCheckboxChange(e, item)} // Pass the item object to handleCheckboxChange
              />

              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800 font-medium mt-2">
                  {item.category || "Category not specified"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-800 font-medium mr-4">
                  Quantity: {item.quantity || 1}
                </p>
                <p className="text-green-600 font-bold text-lg">
                  ${item.totalPrice || "Price not available"}
                </p>
              </div>
              <button
                className="text-red-500 ml-4"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Checkout Button */}
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
