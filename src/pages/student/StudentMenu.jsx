import axios from "axios";
import { Filter, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NothingFound from "../../components/NothingFound";
import HomeyMealsLoader from "./../../components/HomeyMealsLoader";
import MealCard from "./../../components/MealCard";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchRating = async (itemId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/rating/average-rating/${itemId}`
      );
      return parseFloat(response.data.averageRating) || 0;
    } catch (err) {
      console.error(`Error fetching rating for item ${itemId}:`, err);
      return 0;
    }
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/item/items"
        );
        const items = response.data || [];

        // Fetch ratings for all meals
        const mealsWithRatings = await Promise.all(
          items.map(async (meal) => {
            const rating = await fetchRating(meal._id);
            return {
              ...meal,
              averageRating: rating,
            };
          })
        );

        setMeals(mealsWithRatings);
        const uniqueCategories = [
          "All",
          ...new Set(items.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to load meals. Please try again later.");
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredMeals = useMemo(() => {
    let result = meals;
    if (selectedCategory !== "All") {
      result = result.filter((meal) => meal.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(
        (meal) =>
          meal?.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meal?.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [meals, selectedCategory, searchQuery]);

  const groupedMeals = useMemo(() => {
    const groups = {};
    filteredMeals.forEach((meal) => {
      if (!groups[meal.category]) {
        groups[meal.category] = [];
      }
      if (meal.status === "approved") {
        groups[meal.category].push(meal);
      }
    });
    // Remove categories with no pending meals
    Object.keys(groups).forEach((category) => {
      if (groups[category].length === 0) {
        delete groups[category];
      }
    });
    return groups;
  }, [filteredMeals]);

  const handleDetails = (meal) => {
    navigate(`../meal/${meal._id}`);
  };

  if (loading) return <HomeyMealsLoader />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-[100vh]">
      <div className="mb-8 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-in-out"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-in-out"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Filter
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {Object.entries(groupedMeals).map(([category, items]) => (
        <div key={category} className="mb-12">
          <div className="relative mb-6">
            <h2 className="text-3xl font-bold text-gray-800 relative">
              {category} Meals
              <div className="absolute bottom-[-8px] left-0 w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((meal) => (
              <div
                key={meal._id}
                className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <MealCard meal={meal} handleDetails={handleDetails} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedMeals).length === 0 && (
        <NothingFound message="No meals found. Please try again later." />
      )}
    </div>
  );
};

export default MealList;
