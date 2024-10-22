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
      className={`px-6 py-3 font-semibold rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors duration-300 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
