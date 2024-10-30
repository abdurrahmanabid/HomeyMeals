import React from "react";
import { FaBell, FaSearch, FaShoppingCart } from "react-icons/fa";

const StudentHome = () => {
      

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to HomeyMeals!
        </h1>
        <div className="flex space-x-4 items-center">
          <FaSearch className="text-gray-600 cursor-pointer hover:text-gray-800" />
          <FaShoppingCart className="text-gray-600 cursor-pointer hover:text-gray-800" />
          <FaBell className="text-gray-600 cursor-pointer hover:text-gray-800" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-6">
        {/* Search Section */}
        <section className="bg-white p-4 shadow-md rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Find Your Favorite Meal
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for meals, cuisines..."
              className="w-full p-2 rounded-lg border border-gray-300"
            />
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
              Search
            </button>
          </div>
        </section>

        {/* Popular Meals Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Popular Meals
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Sample Meal Card */}
            {[1, 2, 3, 4, 5, 6].map((meal, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Meal"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  Delicious Meal {meal}
                </h3>
                <p className="text-gray-600 mt-2">Home-cooked with love!</p>
                <button className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Order History Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Order History
          </h2>
          <div className="bg-white p-4 shadow-md rounded-lg">
            {/* Sample Order */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Meal Name</h3>
                <p className="text-gray-600">Ordered on: 2023-10-27</p>
              </div>
              <span className="text-green-500 font-semibold">Delivered</span>
            </div>
            {/* Repeat similar structure for more orders */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentHome;
