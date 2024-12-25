import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Manage Sellers */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Manage Sellers</h2>
            <button className="w-full bg-white text-blue-700 py-3 px-5 rounded mb-3 font-medium hover:bg-gray-100">View Sellers</button>
            <button className="w-full bg-blue-800 py-3 px-5 rounded font-medium hover:bg-blue-900">Add New Seller</button>
          </div>

          {/* Manage Consumers */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Manage Consumers</h2>
            <button className="w-full bg-white text-green-700 py-3 px-5 rounded mb-3 font-medium hover:bg-gray-100">View Consumers</button>
            <button className="w-full bg-green-800 py-3 px-5 rounded font-medium hover:bg-green-900">Add New Consumer</button>
          </div>

          {/* Manage Orders */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Manage Orders</h2>
            <button className="w-full bg-white text-yellow-700 py-3 px-5 rounded mb-3 font-medium hover:bg-gray-100">View Active Orders</button>
            <button className="w-full bg-yellow-800 py-3 px-5 rounded font-medium hover:bg-yellow-900">View Completed Orders</button>
          </div>

          {/* Manage Riders */}
          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Manage Riders</h2>
            <button className="w-full bg-white text-red-700 py-3 px-5 rounded mb-3 font-medium hover:bg-gray-100">View Riders</button>
            <button className="w-full bg-red-800 py-3 px-5 rounded font-medium hover:bg-red-900">Add New Rider</button>
          </div>

          {/* Statistics */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-r from-gray-100 to-gray-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Statistics</h2>
            <div className="text-lg">
              <p className="mb-2">Total Sellers: <span className="font-bold text-gray-800">50</span></p>
              <p className="mb-2">Total Consumers: <span className="font-bold text-gray-800">200</span></p>
              <p className="mb-2">Active Orders: <span className="font-bold text-gray-800">15</span></p>
              <p>Riders Available: <span className="font-bold text-gray-800">10</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
