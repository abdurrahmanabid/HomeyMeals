import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  xxl: "max-w-2xl",
  xxxl: "max-w-4xl",
};

const heightClasses = {
  auto: "h-auto",
  sm: "h-48",
  md: "h-64",
  lg: "h-80",
  xl: "h-96",
  xxl: "h-[30rem]",
  xxxl: "h-[40rem]",
  full: "min-h-full"
};

 const  Modal=({
  className = "",
  title,
  handleModalClose,
  children,
  component,
  size = "md",
  height = "auto",
  showCloseButton = true,
}) =>{
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const closeModalWithAnimation = () => {
    setShowModal(false);
    setTimeout(handleModalClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-90 flex items-center justify-center transition-opacity duration-300 ${
        showModal ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-full ${
          sizeClasses[size]
        } ${
          heightClasses[height]
        } overflow-auto ${className} transition-transform duration-300 transform ${
          showModal ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showCloseButton && (
            <button
              onClick={closeModalWithAnimation}
              className="hover:bg-gray-200 rounded-full p-1 transition-colors"
            >
              <AiOutlineClose className="h-6 w-6 text-gray-600" />
            </button>
          )}
        </div>
        <div className="w-full">{component ? component : children}</div>
      </div>
    </div>
  );
}
export default Modal