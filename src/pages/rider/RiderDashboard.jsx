import React from "react";
import { FaFileAlt } from "react-icons/fa";

const RiderDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
      <div className="text-slate-600 mx-auto grid max-w-5xl grid-cols-1 gap-y-4 gap-x-6 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-8 sm:my-10 sm:rounded-lg sm:border sm:shadow-lg bg-white">
        {/* Overview Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col justify-between border-b py-3 sm:flex-row">
          <p className="font-medium">Overview</p>
          <select className="text-slate-500 hover:bg-slate-200 rounded-lg border-2 px-4 py-2 font-medium focus:outline-none focus:ring mt-2 sm:mt-0">
            <option value="last-month">Last Month</option>
            <option value="last-2-months">Last 2 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
        {/* Pending Orders Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-gradient-to-t from-green-500 to-teal-500 px-6 py-8 rounded-lg">
          <p className="mb-4 font-medium text-teal-100">Pending Orders</p>
          <div className="mb-6 flex max-w-xs">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-400 mr-4">
              <FaFileAlt className="h-6 w-6" />
            </div>
            <div>
              <p className="mb-1 text-2xl font-black text-white">102</p>
              <p className="font-medium text-teal-100">$8,230.00</p>
            </div>
          </div>
        </div>

        {/* Order Stats Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4 py-4 sm:gap-8 sm:px-4">
          <div>
            <p className="text-lg font-bold">30</p>
            <p className="text-slate-400 mb-2 font-medium">
              Orders in Progress
            </p>
            <span className="bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 text-xs font-medium">
              In Progress
            </span>
          </div>
          <div>
            <p className="text-lg font-bold">12</p>
            <p className="text-slate-400 mb-2 font-medium">Completed Orders</p>
            <span className="rounded-full bg-teal-200 px-2 py-0.5 text-xs font-medium text-teal-600">
              Completed
            </span>
          </div>
          <div>
            <p className="text-lg font-bold">5</p>
            <p className="text-slate-400 mb-2 font-medium">Cancelled</p>
            <span className="rounded-full bg-red-200 px-2 py-0.5 text-xs font-medium text-red-600">
              Cancelled
            </span>
          </div>
          <div>
            <p className="text-lg font-bold">8</p>
            <p className="text-slate-400 mb-2 font-medium">New Requests</p>
            <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-600">
              New
            </span>
          </div>
        </div>

        {/* Earnings Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 grid grid-cols-2 gap-6 border-t py-4 sm:grid-cols-4 sm:px-4 sm:py-8">
          <div>
            <p className="text-slate-500 text-sm">Total Earnings</p>
            <p className="text-xl font-medium">$3,120</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Pending Payments</p>
            <p className="text-xl font-medium">$800</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Completed Payments</p>
            <p className="text-xl font-medium">$2,320</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Target</p>
            <p className="text-xl font-medium">$4,500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
