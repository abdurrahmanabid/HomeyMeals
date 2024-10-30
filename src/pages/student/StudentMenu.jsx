import React, { useState } from "react"; // Import useState
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

  // Filter meals based on selected category
  const filteredMeals =
    selectedCategory === "All"
      ? mealData // Assuming mealData is an array of meals
      : mealData.filter((meal) => meal.category === selectedCategory);

  const handleOrder = (mealName) => {
    alert(`${mealName} has been added to your cart!`);
  };

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
          <MealCard key={meal.id} meal={meal} handleOrder={handleOrder} />
        ))}
      </div>
    </div>
  );
};

export default MealList;
