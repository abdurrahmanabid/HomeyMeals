import React from 'react';
import { FaUserGraduate, FaStore, FaBiking } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';

const AllUser = () => {
    const navigate =useNavigate();
  const handleClick = (role) => {
    navigate(`/admin/user-table/${role}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">User Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full px-6">
        {/* Students Card */}
        <div
          onClick={() => handleClick('Student')}
          className="cursor-pointer bg-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center"
        >
          <FaUserGraduate className="text-6xl mb-4" /> {/* Icon */}
          <h3 className="text-2xl font-semibold mb-2">Student</h3>
          <p className="text-sm text-center">Explore resources and tools for students.</p>
        </div>

        {/* Seller Card */}
        <div
          onClick={() => handleClick('Seller')}
          className="cursor-pointer bg-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center"
        >
          <FaStore className="text-6xl mb-4" /> {/* Icon */}
          <h3 className="text-2xl font-semibold mb-2">Seller</h3>
          <p className="text-sm text-center">Access tools for sellers to grow their business.</p>
        </div>

        {/* Rider Card */}
        <div
          onClick={() => handleClick('Rider')}
          className="cursor-pointer bg-green-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center"
        >
          <FaBiking className="text-6xl mb-4" /> {/* Icon */}
          <h3 className="text-2xl font-semibold mb-2">Rider</h3>
          <p className="text-sm text-center">Find resources for riders and delivery services.</p>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
