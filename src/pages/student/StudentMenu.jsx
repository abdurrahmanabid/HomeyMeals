import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MealCard from "../../components/MealCard";
import CategoryFilter from "../../components/CategoryFilter";
import mealData from "../../store/mealData";

const MealList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Appetizers", "Main Courses", "Desserts", "Drinks"];
  const navigate = useNavigate();

  // Filter meals based on selected category
  const filteredMeals =
    selectedCategory === "All"
      ? mealData
      : mealData.filter((meal) => meal.category === selectedCategory);

      const handleDetails = (meal) => {
        navigate(`/student/meal/${meal.id}`);
      };

  // const handleAddToCart = (meal) => {
  //   console.log("🚀 ~ handleAddToCart ~ meal:", meal)
  //   // Retrieve cart data from localStorage or initialize an empty array
  //   const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  //   // Add the selected meal to the cart
  //   const updatedCart = [...existingCart, meal];

  //   // Save updated cart back to localStorage
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));

  //   // Show an alert to confirm the addition
  //   alert(`${meal.name} has been added to your cart!`);
  //   navigate('/student/checkout');

  // };

  return (
    <>
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Our Menu
      </h1>

      {/* Category Selector */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Display filtered meals */}
      <div className="flex flex-wrap justify-center">
        {filteredMeals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            handleDetails={() => handleDetails(meal)}
            handleAddToCart={() => handleAddToCart(meal)}
          />
        ))}
      </div>
    </div></>
  );
};

export default MealList;
