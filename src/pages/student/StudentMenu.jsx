import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import MealCard from "../../components/MealCard";
import CategoryFilter from "./../../components/CategoryFilter";
import mealData from "./../../store/mealData";

const MealList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Appetizers",
    "Main Courses",
    "Desserts",
    "Drinks",
  ];
  const navigate = useNavigate()
  // Filter meals based on selected category
  const filteredMeals =
    selectedCategory === "All"
      ? mealData // Assuming mealData is an array of meals
      : mealData.filter((meal) => meal.category === selectedCategory);

  const handleOrder = (mealName) => {
    console.log(`${mealName} has been added to your cart!`);
    navigate('/student/checkout')
  };
  const handleAddToCart =()=>{
    // toast.success("Added Sucsessfully")
  }

  return (
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
          <MealCard key={meal.id} meal={meal} handleOrder={handleOrder} handleAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default MealList;
