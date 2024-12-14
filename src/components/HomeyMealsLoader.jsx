import React, { useEffect, useState } from "react";
import logo from "./../assets/imgs/favicon.png";

const HomeyMealsLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center w-full max-w-md px-6">
        <div className="relative inline-block mb-6">
          {/* Logo with smooth animation */}
          <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
            <img
              src={logo}
              alt="HomeyMeals Logo"
              className="relative z-10 w-24 h-24 object-contain transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            HomeyMeals
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Preparing your culinary experience...
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Progress Percentage */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Loading: {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeyMealsLoader;
