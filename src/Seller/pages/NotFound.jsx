import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Oops! Page not found.</h2>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
