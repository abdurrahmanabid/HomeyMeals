import React from 'react';
import { FaClock, FaCheckCircle, FaBan, FaThList } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';

const AllItems = () => {
  const navigate = useNavigate();
  const handleClick = (category) => {
    navigate(`/admin/item-table/${category}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Item Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl w-full px-6">
           {/* All Items Card */}
           <div
          onClick={() => handleClick('AllItems')}
          className="cursor-pointer bg-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center"
        >
          <FaThList className="text-6xl mb-4" /> {/* Icon */}
          <h3 className="text-2xl font-semibold mb-2">All Items</h3>
          <p className="text-sm text-center">Explore the complete list of items.</p>
        </div>
        {/* Pending Card */}
        <div
          onClick={() => handleClick('pending')}
          className="cursor-pointer bg-yellow-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center"
        >
          <FaClock className="text-6xl mb-4" /> {/* Icon */}
          <h3 className="text-2xl font-semibold mb-2">Pending</h3>
          <p className="text-sm text-center">View all items awaiting approval.</p>
        </div>

        {/* Approved Card */}
        <div
          onClick={() => handleClick('approved')}
          className="cursor-pointer bg-green-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center"
        >
          <FaCheckCircle className="text-6xl mb-4" /> {/* Icon */}
          <h3 className="text-2xl font-semibold mb-2">Approved</h3>
          <p className="text-sm text-center">Browse all approved items.</p>
        </div>

        {/* Idle Card */}
        <div
          onClick={() => handleClick('idle')}
          className="cursor-pointer bg-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center"
        >
          <FaBan className="text-6xl mb-4" /> {/* Icon */}
          <h3 className="text-2xl font-semibold mb-2">Idle</h3>
          <p className="text-sm text-center">Check out idle or inactive items.</p>
        </div>
      </div>
    </div>
  );
};

export default AllItems;
