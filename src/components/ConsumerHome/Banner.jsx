import React from "react";
import Button from "../Button";

const Banner = () => {
  return (
    <div className="bg-peach-100 py-8 px-4 sm:px-10 flex flex-col md:flex-row items-center justify-between">
      {/* Image Section */}
      <div className="flex space-x-4 md:space-x-6">
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/pre-prepared-food-showcasing-ready-eat-delicious-meals-go_23-2151246075.jpg?ga=GA1.1.735624638.1728972610&semt=ais_hybrid"
            alt="Delicious meal"
            className="w-full sm:w-72 h-64 sm:h-96 object-cover rounded-lg shadow-lg"
          />
          <img
            src="https://img.freepik.com/free-photo/high-angle-pakistan-meal-assortment_23-2148821516.jpg?ga=GA1.1.735624638.1728972610&semt=ais_hybrid"
            alt="Prepared food"
            className="absolute bottom-0 right-0 w-32 sm:w-48 h-48 sm:h-64 object-cover rounded-lg shadow-lg translate-x-2 translate-y-4 sm:translate-x-4 sm:translate-y-6"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="mt-6 md:mt-0 md:ml-12 text-center md:text-left max-w-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Your everyday ready-to-eat market & more
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
          Find fresh and delicious meals delivered to your doorstep with ease.
        </p>
      <Button className="mt-4 ml-0">Explore more</Button>
      </div>
    </div>
  );
};

export default Banner;
