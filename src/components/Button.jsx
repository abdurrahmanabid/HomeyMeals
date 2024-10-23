import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg text-white bg-primary hover:bg-secondary transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-20"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
