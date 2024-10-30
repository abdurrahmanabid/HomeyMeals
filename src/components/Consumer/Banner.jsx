import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 py-16 px-6 md:px-20 relative">
      {/* Left Side - Text and Search Bar */}
      <div className="flex-1 z-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800">
          It’s the food and groceries you love, delivered
        </h1>
        <div className="mt-6 flex justify-center md:justify-start items-center space-x-2 bg-white shadow-md rounded-lg overflow-hidden max-w-lg w-full">
          <input
            type="text"
            placeholder="Your street and street number"
            className="flex-grow p-3 text-gray-600 placeholder-gray-400 focus:outline-none"
          />
          <button className="flex items-center px-4 py-2 text-pink-600 hover:bg-gray-100 transition">
            <FaMapMarkerAlt className="mr-2" />
            Locate me
          </button>
          <button className="bg-pink-500 text-white px-6 py-3 font-semibold hover:bg-pink-600 transition">
            Find food
          </button>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div
        className="hidden md:block md:w-1/2 h-full absolute inset-y-0 right-0 bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/path/to/your/image.png')", // Replace with the path to your image
          backgroundPosition: "right center",
          backgroundSize: "contain",
        }}
      ></div>
    </div>
  );
};

export default Banner;
