import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mealData from "../../store/mealData";
import axios from 'axios';
import Taka from '../../components/Taka';

const StudentMealDetails = () => {
  const { mealId } = useParams();
   const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/item/get-item/${mealId}`
        );

        const items = response.data;
        setMeals(items);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to load meals. Please try again later.");
        setLoading(false);
      }
    };
    fetchMeals();
  });

  const [quantity, setQuantity] = useState(1); 
 

  if (!meals) {
    return <p className="text-center text-xl text-gray-600">Meal not found.</p>;
  }

  // Handle increment and decrement of quantity
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Calculate total price
  const pricePerUnit = meals?.discountPrice > 0 ? meals.discountPrice : meals?.price;
  const totalPrice = pricePerUnit * quantity;

  const handleAddToCart = (meals, quantity, totalPrice) => {
    console.log("Added to cart:", { meals, quantity, totalPrice });
    // Add your cart logic here
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Full-width image */}
      <div className="relative">
        <img
          className="w-full h-80 object-cover"
          src={meals.imageBase64}
          alt={meals.name}
        />
        <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded-md text-2xl font-semibold">
          {meals.itemName}
        </div>
      </div>

      {/* meals Details */}
      <div className="px-8 py-12 space-y-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-teal-600">{meals.itemName}</h2>
        
        {/* Meal Description */}
        <div className="text-lg leading-relaxed text-gray-700">
          <h3 className="text-2xl font-semibold text-teal-600 mb-2">Description</h3>
          <p>{meals.description}</p>

        </div>
        <p className="flex items-center">
            <span className="text-2xl font-bold text-slate-900 flex justify-center items-center gap-2">
              <Taka />
              {meals.discountPrice > 0 ? meals.discountPrice : null}
            </span>
            <span className="text-sm text-slate-500 line-through ml-2">
              {meals.discountPrice > 0 ? meals.price : null}
            </span>
          </p>
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
          onClick={() => handleAddToCart(meals, quantity, totalPrice)}
        >
          Order Now - ${totalPrice}
        </button>
      </div>
    </div>
  );
};

export default StudentMealDetails;
