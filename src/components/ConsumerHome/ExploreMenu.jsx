import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from "../Button";

const ExploreMenu = () => {
  // Sample menu items for each tab
  const greatestHitsItems = [
    {
      id: 1,
      title: "Sirloin Steak and Bacon Demi",
      description: "with white cheddar potatoes and green beans",
      image: "https://via.placeholder.com/150", // Replace with actual images
    },
    {
      id: 2,
      title: "Jalapeño-Popper Chicken",
      description: "with corn and zucchini",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Jalapeño-Popper Chicken",
      description: "with corn and zucchini",
      image: "https://via.placeholder.com/150",
    },
  ];

  const easyPrepItems = [
    {
      id: 1,
      title: "Tuscan-Style Shrimp Penne",
      description: "with mushrooms and tomatoes",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Tuscan-Style Shrimp Penne",
      description: "with mushrooms and tomatoes",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Tuscan-Style Shrimp Penne",
      description: "with mushrooms and tomatoes",
      image: "https://via.placeholder.com/150",
    },
  ];

  const freshStartItems = [
    {
      id: 1,
      title: "Sweet Chili Pork Lettuce Wraps",
      description: "with crispy rice noodles",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Sweet Chili Pork Lettuce Wraps",
      description: "with crispy rice noodles",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Sweet Chili Pork Lettuce Wraps",
      description: "with crispy rice noodles",
      image: "https://via.placeholder.com/300",
    },
  ];

  // Define tabs and corresponding menu items
  const tabs = [
    { id: 1, name: "Greatest Hits", items: greatestHitsItems },
    { id: 2, name: "Easy-Prep Meals", items: easyPrepItems },
    { id: 3, name: "Fresh-Start Meals", items: freshStartItems },
  ];

  // State to track the current tab
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="px-8 py-12 flex flex-col justify-center">
      <p className="text-center text-gray-600 mb-8">
        Find your new favorite meal with meal kits starting at 150/- per
        serving.
      </p>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mx-2 px-4 py-2 border-b-2 font-semibold ${
              activeTab.id === tab.id
                ? "text-secondary border-secondary"
                : "text-gray-500 border-transparent hover:border-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {activeTab.items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition w-96 duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="min-w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to={"/menu"} className="mt-4 self-center">
        <Button className="mt-4 ml-0">Explore Main Menu</Button>
      </Link>
    </div>
  );
};

export default ExploreMenu;
