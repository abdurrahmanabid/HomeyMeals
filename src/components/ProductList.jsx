import React from "react";
import {
  FaCalendarAlt,
  FaCartPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";

const ProductList = ({ meals }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {meals.map((meal) => {
        // Calculate the discount and discounted price
        const discount = 0.05; // 5% discount
        const discountedPrice = meal.price * (1 - discount);
        const discountAmount = meal.price * discount; // Calculate discount amount

        return (
          <div
            key={meal.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            {/* Image */}
            <img
              className="object-cover w-full h-48 md:h-52 lg:h-64"
              src={meal.image_url}
              alt={meal.meal_name}
            />

            {/* Meal Info */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 hover:text-cyan-600 transition-colors duration-200">
                  {meal.meal_name}
                </h3>
                <span
                  className={`${
                    meal.available_quantity > 0
                      ? "text-green-600"
                      : "text-red-600"
                  } font-medium flex items-center`}
                >
                  {meal.available_quantity > 0 ? (
                    <>
                      <FaCheckCircle className="mr-1" /> In Stock
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="mr-1" /> Out of Stock
                    </>
                  )}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{meal.description}</p>

              {/* Additional Info */}
              <div className="mt-4 space-y-1 text-gray-500">
                <p className="flex items-center text-xs">
                  <FaUser className="mr-2 text-cyan-600" />
                  <span className="font-semibold">Seller ID:</span>{" "}
                  {meal.seller_id}
                </p>
                <p className="flex items-center text-xs">
                  <FaCalendarAlt className="mr-2 text-cyan-600" />
                  <span className="font-semibold">Added on:</span>{" "}
                  {new Date(meal.created_at).toLocaleDateString()}
                </p>
                <p className="flex items-center text-xs">
                  <span className="font-semibold text-cyan-600">
                    Available Quantity:
                  </span>{" "}
                  {meal.available_quantity}
                </p>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex flex-col items-center p-5 bg-gray-100">
              <span className="text-2xl font-bold text-gray-900">
                <span className="line-through text-gray-500">
                  ${meal.price.toFixed(2)}
                </span>{" "}
                <span className="text-cyan-700">
                  ${discountedPrice.toFixed(2)}
                </span>
              </span>
              <p className="text-sm text-red-500 font-semibold mb-2">
                You save: ${discountAmount.toFixed(2)} (5%)
              </p>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-cyan-300"
              >
                <FaCartPlus className="mr-2" /> Add to Cart
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
