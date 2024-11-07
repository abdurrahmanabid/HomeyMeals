import React from "react";
import { FaFileAlt } from "react-icons/fa";

const DashboardOverview = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
      <div className=" text-slate-600 mx-auto grid max-w-5xl grid-cols-1 gap-y-4 gap-x-6 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-8 sm:my-10 sm:rounded-lg sm:border sm:shadow-lg bg-white">
        {/* Overview Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col justify-between border-b py-3 sm:flex-row">
          <p className="font-medium">Overview</p>
          <select className="text-slate-500 hover:bg-slate-200 rounded-lg border-2 px-4 py-2 font-medium focus:outline-none focus:ring mt-2 sm:mt-0">
            <option value="last-month">Last Month</option>
            <option value="last-2-months">Last 2 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>

        {/* Cases in Pipeline Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-gradient-to-t from-indigo-500 to-blue-500 px-6 py-8 rounded-lg">
          <p className="mb-4 font-medium text-indigo-100">Cases in Pipeline</p>
          <div className="mb-6 flex max-w-xs">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-400 mr-4">
              <FaFileAlt className="h-6 w-6" />
            </div>
            <div>
              <p className="mb-1 text-2xl font-black text-white">1844</p>
              <p className="font-medium text-indigo-100">$192,234.00</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-col items-center px-4 py-1">
              <p className="text-lg font-medium text-white">232</p>
              <p className="text-xs font-medium text-indigo-100">Quote</p>
            </div>
            <div className="mb-1 flex flex-col items-center px-4 py-1">
              <p className="text-lg font-medium text-white">$140</p>
              <p className="text-xs font-medium text-indigo-100">CAC</p>
            </div>
            <div className="mb-1 flex flex-col items-center rounded-2xl bg-white px-4 py-1">
              <p className="text-lg font-medium text-indigo-500">21</p>
              <p className="text-xs font-medium text-indigo-500">Refunds</p>
            </div>
            <div className="flex flex-col items-center px-4 py-1">
              <p className="text-lg font-medium text-white">$44</p>
              <p className="text-xs font-medium text-indigo-100">PPC</p>
            </div>
          </div>
        </div>

        {/* Drafts and Approvals Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4 py-4 sm:gap-8 sm:px-4">
          <div>
            <p className="text-lg font-bold">32</p>
            <p className="text-slate-400 mb-2 font-medium">$230,000</p>
            <span className="bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 text-xs font-medium">Drafts</span>
          </div>
          <div>
            <p className="text-lg font-bold">621</p>
            <p className="text-slate-400 mb-2 font-medium">$230,000</p>
            <span className="rounded-full bg-indigo-200 px-2 py-0.5 text-xs font-medium text-indigo-600">Pending Approval</span>
          </div>
          <div>
            <p className="text-lg font-bold">68</p>
            <p className="text-slate-400 mb-2 font-medium">$230,000</p>
            <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-700">Sent to Clients</span>
          </div>
          <div>
            <p className="text-lg font-bold">970</p>
            <p className="text-slate-400 mb-2 font-medium">$230,000</p>
            <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-600">Signing</span>
          </div>
        </div>

        {/* Revenue Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 grid grid-cols-2 gap-6 border-t py-4 sm:grid-cols-4 sm:px-4 sm:py-8">
          <div>
            <p className="text-slate-500 text-sm">Revenue</p>
            <p className="text-xl font-medium">$924,883</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Liabilities</p>
            <p className="text-xl font-medium">$924,883</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Profit</p>
            <p className="text-xl font-medium">$213,002</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Target</p>
            <p className="text-xl font-medium">$150,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerDashboard = () => {
  return (
    <div>
      <DashboardOverview />
    </div>
  );
};

export default SellerDashboard;
