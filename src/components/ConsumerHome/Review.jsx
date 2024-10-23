import React from "react";
import Lottie from "react-lottie-player";
import reviewAnimation from "./../../assets/lottie/review.json"; // Update the path to your Lottie file

const Review = () => {
  const reviews = [
    {
      name: "John Doe",
      review:
        "The food was amazing, delivered hot and fresh. Highly recommend HomeyMeals!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      review: "Great service! The variety of meals available is fantastic.",
      rating: 4,
    },
    // Add more reviews here
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center p-8 rounded-lg space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Left side - Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie
          loop
          animationData={reviewAnimation}
          play
          style={{ height: "400px", width: "400px" }}
        />
      </div>

      {/* Right side - Reviews */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-2xl font-bold text-center lg:text-left text-gray-900">
          What Our Customers Say
        </h2>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-accent4 p-4 rounded-md shadow-md">
              <p className="text-lg font-semibold">{review.name}</p>
              <p className="text-gray-600">{review.review}</p>
              <div className="text-yellow-500 mt-2">
                {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
