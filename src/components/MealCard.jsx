import { Info, Star, StarHalf } from "lucide-react";
import React from "react";
import { calculateDiscount } from "../functions/calculateDiscount";
import Button from "./Button";
import Taka from "./Taka";

const MealCard = ({ meal, handleDetails, handleAddToCart }) => {
  // Calculate rating display values
  const rating = meal?.averageRating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="relative m-5 flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <img
          className="object-cover w-full h-full"
          src={meal.imagePreview}
          alt={meal.itemName}
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-primary px-2 text-center text-sm font-medium text-white">
          {calculateDiscount(meal.price, meal.discountPrice) > 0
            ? calculateDiscount(meal.price, meal.discountPrice) + "% OFF"
            : null}
        </span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-2xl font-semibold tracking-tight text-slate-900">
            {meal.itemName}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="flex items-center">
            <span className="text-3xl font-bold text-slate-900 flex justify-center items-center gap-2">
              <Taka />
              {meal.discountPrice > 0 ? meal.discountPrice : null}
            </span>
            <span className="text-sm text-slate-500 line-through ml-2">
              {meal.discountPrice > 0 ? meal.price : null}
            </span>
          </p>
          <div className="flex items-center">
            {rating > 0 ? (
              <>
                <div className="flex items-center">
                  {[...Array(fullStars)].map((_, index) => (
                    <Star
                      key={`full-${index}`}
                      color="#f1ca04"
                      fill="#f1ca04"
                      size={16}
                    />
                  ))}
                  {hasHalfStar && (
                    <StarHalf color="#f1ca04" fill="#f1ca04" size={16} />
                  )}
                  {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
                    (_, index) => (
                      <Star key={`empty-${index}`} color="#f1ca04" size={16} />
                    )
                  )}
                  <span className="ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                    {Number(rating).toFixed(1) + "/5"}
                  </span>
                </div>
              </>
            ) : (
              <span className="rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                New Arrival
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => handleDetails(meal)}
            className="flex items-center justify-center rounded-md bg-green-500 text-white px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-green-300 w-full hover:bg-green-600"
          >
            <Info />
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
