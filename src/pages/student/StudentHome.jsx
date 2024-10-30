import React from "react";
import { FaBell, FaSearch, FaShoppingCart } from "react-icons/fa";

const StudentHome = () => {
  return (
<div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-8 px-8 sm:p-8 lg:px-28 ">
{/* Header Section */}
      <header className="flex justify-between items-center bg-white p-6 shadow-lg rounded-xl">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-wide">
          Welcome to HomeyMeals!
        </h1>
        <div className="flex space-x-5 items-center">
          <FaSearch className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200" />
          <FaShoppingCart className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200" />
          <FaBell className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-8 space-y-8">
        {/* Search Section */}
        <section className="bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-2xl font-medium text-gray-800 mb-3">
            Find Your Favorite Meal
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for meals, cuisines..."
              className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition duration-200">
              Search
            </button>
          </div>
        </section>

        {/* Popular Meals Section */}
        <section>
          <h2 className="text-2xl font-medium text-gray-800 mb-6">
            Popular Meals
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Sample Meal Card */}
            {[1, 2, 3, 4, 5, 6].map((meal, index) => (
              <div key={index} className="bg-white p-5 shadow-lg rounded-xl transition hover:shadow-2xl">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Meal"
                  className="w-full h-48 object-cover rounded-lg mb-5"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  Delicious Meal {meal}
                </h3>
                <p className="text-gray-600 mt-2">Home-cooked with love!</p>
                <button className="mt-5 w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-200">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Order History Section */}
        <section>
          <h2 className="text-2xl font-medium text-gray-800 mb-6">
            Your Order History
          </h2>
          <div className="bg-white p-6 shadow-lg rounded-xl">
            {/* Sample Order */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 last:border-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Meal Name</h3>
                <p className="text-gray-500">Ordered on: 2023-10-27</p>
              </div>
              <span className="text-green-500 font-medium">Delivered</span>
            </div>
            {/* Repeat similar structure for more orders */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentHome;
