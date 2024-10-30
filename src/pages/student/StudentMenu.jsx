import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate =  useNavigate()

  const categories = ["All", "Appetizers", "Main Courses", "Desserts", "Drinks"];
  const meals = [
    { id: 1, name: "Grilled Salmon", category: "Main Courses" },
    { id: 2, name: "Chocolate Cake", category: "Desserts" },
    { id: 3, name: "Spaghetti Carbonara", category: "Main Courses" },
    { id: 4, name: "Caesar Salad", category: "Appetizers" },
    { id: 5, name: "Lemonade", category: "Drinks" },
    { id: 6, name: "Garlic Bread", category: "Appetizers" },
  ];

  const filteredMeals = selectedCategory === "All"
    ? meals
    : meals.filter(meal => meal.category === selectedCategory);

    const handleOrder =()=>{
        navigate("/student/checkout")
    }

  return (
    <div className="min-h-screen bg-accent5 p-8 sm:p-12 lg:px-36">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Menu</h1>

      {/* Category Selector */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full sm:w-64">
          <label className="block text-lg font-medium text-gray-700 mb-2 text-center">
            <FaFilter className="inline mr-2 text-gray-500" /> Select Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Meal Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white p-6 shadow-lg rounded-xl transition duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src="https://via.placeholder.com/150"
              alt={meal.name}
              className="w-full h-52 object-cover rounded-lg mb-4 shadow-md"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{meal.name}</h3>
            <p className="text-gray-600 mb-4">Home-cooked with love!</p>
            <button 
            onClick={handleOrder}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition duration-300">
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentMenu;
