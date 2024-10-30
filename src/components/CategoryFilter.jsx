import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { FaChevronDown, FaFilter } from "react-icons/fa";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="mb-8 flex justify-center">
      <div className="relative w-full sm:w-64">
        <label className="block text-lg font-medium text-gray-700 mb-2 text-center">
          <FaFilter className="inline mr-2 text-gray-500" aria-hidden="true" />{" "}
          Select Category
        </label>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 px-3 rounded-lg border border-gray-300 shadow-sm cursor-pointer transition duration-200 ease-in-out hover:shadow-lg flex justify-between items-center bg-white hover:bg-gray-50"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="text-gray-800 font-semibold">
            {selectedCategory || "Select a category"}
          </span>
          <FaChevronDown className="text-gray-600 transition-transform duration-200 hover:scale-105" />
        </div>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-300 transition-transform duration-200 ease-in-out">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(category)}
                className="flex items-center p-2 cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-150 ease-in-out rounded-lg"
              >
                {selectedCategory === category && (
                  <BiCheck className="mr-2 text-blue-600" />
                )}
                <span className="text-sm">{category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
