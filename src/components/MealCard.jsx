import React from "react";
import { MdOutlineAddShoppingCart,  } from "react-icons/md";
import Button from "./Button";
import { TbListDetails } from "react-icons/tb";

const MealCard = ({ meal, handleDetails, handleAddToCart }) => {
  return (
    <div className="relative m-5 flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <img
          className="object-cover w-full h-full"
          src={meal.image}
          alt={meal.name}
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-primary px-2 text-center text-sm font-medium text-white">
          {meal.discount}
        </span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-2xl font-semibold tracking-tight text-slate-900">
            {meal.name}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="flex items-center">
            <span className="text-3xl font-bold text-slate-900">
            ${meal.price}
            </span>
            <span className="text-sm text-slate-500 line-through ml-2">
              $25
            </span>
          </p>
          <div className="flex items-center">
            {/* Star Rating */}
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {meal.rating}
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          {/* <Button
            onClick={() => handleAddToCart(meal)}
            className="flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 w-full"
          >
            <MdOutlineAddShoppingCart size={25} />
            Add to Cart
          </Button> */}
          <Button
            onClick={() => handleDetails(meal)}
            className="flex items-center justify-center rounded-md bg-green-500 text-white px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-green-300 w-full hover:bg-green-600"
          >
            <TbListDetails  size={25} />
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
