import React from "react";

const ProfileDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        {/* Header: Profile Image, Name, Student Status */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32">
            <img
              className="rounded-full w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt="Profile"
            />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.fullName}
          </h1>
          <p className="text-gray-600">Student at Dhaka University</p>
          <span className="mt-2 inline-block rounded-full bg-blue-200 py-1 px-3 text-sm text-blue-700">
            Active Member
          </span>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Bio</h2>
          <p className="mt-2 text-gray-600">
            Alex is a third-year student majoring in Economics, balancing
            studies and a busy schedule. Alex relies on HomeyMeals for
            affordable, nutritious meals throughout the week.
          </p>
        </div>

        {/* Order Preferences */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Order Preferences
          </h2>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>Preferred Meal Times: Lunch and Dinner</li>
            <li>Average Monthly Orders: 15-20 meals</li>
            <li>Favorite Cuisines: Bengali, Italian, Chinese</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Contact Information
          </h2>
          <div className="mt-2 space-y-1 text-gray-600">
            <p>Email: alex.johnson@studentmail.com</p>
            <p>Phone: (555) 789-1234</p>
            <p>Location: Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Favorite Cuisines */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Favorite Cuisines
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2 text-gray-600">
            <li className="rounded-full bg-gray-200 px-3 py-1">Bengali</li>
            <li className="rounded-full bg-gray-200 px-3 py-1">Italian</li>
            <li className="rounded-full bg-gray-200 px-3 py-1">Chinese</li>
            <li className="rounded-full bg-gray-200 px-3 py-1">Thai</li>
          </ul>
        </div>

        {/* Order History */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
          <div className="mt-4 space-y-4">
            {/* Sample Order Items */}
            <div className="flex justify-between rounded-lg bg-gray-100 p-4">
              <div>
                <p className="font-semibold text-gray-700">Order #6789</p>
                <p className="text-gray-600">Delivered on Oct 25, 2024</p>
              </div>
              <p className="font-semibold text-green-600">Completed</p>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-100 p-4">
              <div>
                <p className="font-semibold text-gray-700">Order #6788</p>
                <p className="text-gray-600">Delivered on Oct 20, 2024</p>
              </div>
              <p className="font-semibold text-green-600">Completed</p>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-100 p-4">
              <div>
                <p className="font-semibold text-gray-700">Order #6787</p>
                <p className="text-gray-600">Cancelled on Oct 15, 2024</p>
              </div>
              <p className="font-semibold text-red-600">Cancelled</p>
            </div>
          </div>
        </div>

        {/* CTA - Reorder or Contact Support */}
        <div className="mt-8 text-center space-x-4">
          <button className="rounded bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600">
            Reorder Favorite
          </button>
          <button className="rounded bg-gray-500 py-2 px-4 font-semibold text-white hover:bg-gray-600">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
