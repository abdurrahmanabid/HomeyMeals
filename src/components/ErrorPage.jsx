import { AlertCircle } from "lucide-react";
import React from "react";

const ErrorPage = ({
  code = "500",
  title = "Something went wrong",
  message = "Our servers are having issues right now. Please try again later.",
  showRefresh = true,
  showHome = true,
  customAction,
  customActionLabel,
}) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center space-y-8 max-w-lg">
        <AlertCircle className="w-16 h-16 text-red-500" aria-hidden="true" />

        <div className="text-center space-y-3">
          <span className="text-7xl font-bold text-gray-900">{code}</span>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
          {showHome && (
            <button
              onClick={() => (window.location.href = "/")}
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              Home
            </button>
          )}

          {showRefresh && (
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Try Again
            </button>
          )}

          {customAction && (
            <button
              onClick={customAction}
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              {customActionLabel || "Continue"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
