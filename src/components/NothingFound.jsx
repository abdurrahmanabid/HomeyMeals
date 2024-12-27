import { SearchX } from "lucide-react";
import React from "react";

const NothingFound = ({
  message = "Nothing Found",
  suggestion = "We couldn't find what you're looking for",
  icon = true,
  onAction = () => (window.location.href = "/"),
}) => {
  return (
    <div className="mt-96 w-full flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {icon && (
          <SearchX className="w-16 h-16 text-gray-400" aria-hidden="true" />
        )}

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{message}</h2>
          <p className="text-lg text-gray-600">{suggestion}</p>
        </div>

        <button
          onClick={onAction}
          className="text-lg px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NothingFound;
