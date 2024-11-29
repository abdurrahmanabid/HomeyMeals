import { ToggleSwitch } from "flowbite-react";
import React, { useState } from "react";
import CurrentLocation from "./CurrentLocation";
import CustomLocation from "./CustomLocation";

const SetLocation = () => {
  const [current, setCurrent] = useState( null);

  // Trigger SweetAlert when the toggle changes
  const handleToggleChange = (value) => {
    setCurrent(value);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Set Your Location
      </h2>
      <p className="text-gray-600 mb-4">
        Please choose your preferred location. You can either allow us to use
        your current location, or enter a custom location manually.
      </p>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">
            Location Type
          </label>
          <p className="text-sm text-gray-500">
            Select how you want to set your location.
          </p>
        </div>
        <ToggleSwitch
          checked={current || false}
          label="Use Current Location"
          onChange={handleToggleChange}
          className="text-gray-700"
        />
      </div>

      {current ? (
        <div className="border-t-2 pt-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Current Location
          </h3>
          <CurrentLocation />
        </div>
      ) : (
        <div className="border-t-2 pt-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Enter Custom Location
          </h3>
          <CustomLocation />
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none">
          Save Location
        </button>
      </div>
    </div>
  );
};

export default SetLocation;
