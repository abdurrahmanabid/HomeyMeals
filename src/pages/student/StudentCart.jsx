import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart data from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log('Retrieved Cart from Local Storage:', savedCart); // Debugging line
    setCartItems(savedCart);
  }, []);

  // Remove item from cart
  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/student/checkout');
    } else {
      alert("Your cart is empty. Add items to checkout.");
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
    console.log(`Item: ${item.name}, Price: ${itemPrice}`); // Debugging line
    return total + itemPrice; // Accumulate the total
  }, 0);

  console.log(`Total Price: ${totalPrice}`); // Debugging line

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
              <p className="text-green-600 font-bold text-lg">
                ${item.price || "Price not available"}
              </p>
              <button
                className="text-red-500 ml-4"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price Display */}
          <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg mt-6">
            <span className="text-xl font-semibold">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
          </div>

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
