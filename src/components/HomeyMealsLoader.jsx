import React from "react";
import logo from './../assets/imgs/favicon.png';

const HomeyMealsLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 -m-[20vh] overflow-hidden">
      <div className="flex flex-col items-center space-y-6">
        {/* Rotating Logo */}
        <div className="">
          <img
            src={logo}
            alt="logo"
            className="text-6xl text-primary animate-spin-slow h-20"
            aria-label="HomeyMeals Logo"
          />
          <div className="absolute inset-0 animate-pulse-glow bg-primary/20 rounded-full"></div>
        </div>
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-800 dark:text-gray-200">
          <span className="inline-block animate-zigzag">HomeyMeals</span>
          <span className="animate-sharp text-primary">...</span>
        </h1>
      </div>
    </div>
  );
};

export default HomeyMealsLoader;
