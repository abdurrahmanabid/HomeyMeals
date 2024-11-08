import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import mealData from "../../store/mealData";

const StudentMealDetails = () => {
  const { mealId } = useParams();
  const meal = mealData.find((m) => m.id === parseInt(mealId, 10));

  const [quantity, setQuantity] = useState(1); // Track the number of items to order
  const pricePerUnit = meal.price; // Assuming a fixed price per unit for the meal

  if (!meal) {
    return <p className="text-center text-xl text-gray-600">Meal not found.</p>;
  }

  // Handle increment and decrement of quantity
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Calculate total price
  const totalPrice = (pricePerUnit * quantity);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Full-width image */}
      <div className="relative">
        <img
          className="w-full h-80 object-cover"
          src={meal.image}
          alt={meal.name}
        />
        <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded-md text-2xl font-semibold">
          {meal.name}
        </div>
      </div>

      {/* Meal Details */}
      <div className="px-8 py-12 space-y-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-teal-600">{meal.name}</h2>
        
        {/* Meal Description */}
        <div className="text-lg leading-relaxed text-gray-700">
          <h3 className="text-2xl font-semibold text-teal-600 mb-2">Description</h3>
          <p>{meal.details}</p>
          
        </div>
        
        {/* Price and Info */}
        <div className="flex items-center gap-4 text-lg mt-6">
          <span className="text-teal-600 font-semibold">${pricePerUnit}</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-600"><i className="fas fa-clock"></i> 20 min prep</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-600"><i className="fas fa-utensils"></i> Gluten-free</span>
        </div>

        {/* Quantity Selector */}
        <div className="mt-8 flex items-center gap-4">
          <h3 className="text-2xl font-semibold text-teal-600">Quantity</h3>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={decrementQuantity}
              className="px-4 py-2 text-lg font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="px-6 py-2 text-lg font-semibold">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-4 py-2 text-lg font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Order Now Button with Total Price */}
        <button
          className="mt-8 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
          onClick={() => handleAddToCart(meal, quantity, totalPrice)}
        >
          Order Now - ${totalPrice}
        </button>
      </div>
    </div>
  );
};

// Function to add the selected quantity of meal to cart
const handleAddToCart = (meal, quantity, totalPrice) => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = [
    ...existingCart,
    { ...meal, quantity, totalPrice: parseFloat(totalPrice) },
  ];
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  alert(`${meal.name} (x${quantity}) has been added to your cart for $${totalPrice}!`);
};

export default StudentMealDetails;
