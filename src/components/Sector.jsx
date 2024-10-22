import React from "react";

const Sector = ({children}) => {
  return (
    <div className="bg-primary py-6 px-4 flex flex-col sm:flex-row items-center justify-center text-white w-screen">
      {/* Text Section */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-semibold ">{children}</h2>
      </div>
    </div>
  );
};

export default Sector;
