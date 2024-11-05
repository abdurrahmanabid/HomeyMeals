import React, { useState } from "react";

const StudentHome = () => {
  // Dummy data for popular meals with online images
  const popularMeals = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      description: "Classic Italian pasta with creamy sauce",
      imageUrl: "https://images.unsplash.com/photo-1589308078055-7b2f2f3f5caa",
    },
    {
      id: 2,
      name: "Sushi Platter",
      description: "Assortment of fresh sushi rolls",
      imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    },
    {
      id: 3,
      name: "Chicken Tikka",
      description: "Spicy grilled chicken with rich flavors",
      imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    },
    {
      id: 4,
      name: "Beef Tacos",
      description: "Soft tacos with seasoned beef and toppings",
      imageUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    },
    {
      id: 5,
      name: "Vegan Buddha Bowl",
      description: "Nourishing bowl with fresh veggies and grains",
      imageUrl: "https://images.unsplash.com/photo-1599020039446-0c7d1a5b13fd",
    },
    {
      id: 6,
      name: "Margherita Pizza",
      description: "Classic pizza with tomatoes, mozzarella, and basil",
      imageUrl: "https://images.unsplash.com/photo-1601924573253-f3a3f1af8b11",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeals, setFilteredMeals] = useState(popularMeals);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    // Filter meals based on search term
    const filtered = popularMeals.filter((meal) =>
      meal.name.toLowerCase().includes(term)
    );
    setFilteredMeals(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-8 px-8 sm:p-8 lg:px-28">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-white p-6 shadow-lg rounded-xl">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-wide">
          Welcome to HomeyMeals!
        </h1>
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
              value={searchTerm}
              onChange={handleSearchChange}
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
            {filteredMeals.length > 0 ? (
              filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white p-5 shadow-lg rounded-xl transition hover:shadow-2xl"
                >
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-48 object-cover rounded-lg mb-5"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {meal.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{meal.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No meals found.</p>
            )}
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentHome;
