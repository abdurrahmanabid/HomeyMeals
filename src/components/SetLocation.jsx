import axios from "axios";
import { ToggleSwitch } from "flowbite-react";
import React, { useState } from "react";
import useAuth from "../utils/useAuth";
import CurrentLocation from "./CurrentLocation";
import CustomLocation from "./CustomLocation";

const SetLocation = ({data}) => {
  const [current, setCurrent] = useState( null);
  const [location,setLocation]=useState()
  const user = useAuth()
  const handleToggleChange = (value) => {
    setCurrent(value);
  };
  const handleSaveClick=async()=>{
    
    console.log("🚀 ~ handleSaveClick ~ location:", location)
    const locationData = {
      lng: location.lng,
      lat:location.lat
    };
      try {
        const res= await axios.put(
          `http://localhost:8000/api/profile/map/put/${user.id}`,locationData
        );
        data(location)
        console.log("🚀 ~ handleSaveClick ~ res:", res)
      } catch (error) {
        console.error("Failed to add location:", error);
      } 
  }
    

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
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
          <CurrentLocation setLocation={setLocation} />
        </div>
      ) : (
        <div className="border-t-2 pt-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Enter Custom Location
          </h3>
          <CustomLocation setLocation={setLocation} />
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          onClick={handleSaveClick}
        >
          Save Location
        </button>
      </div>
    </div>
  );
};

export default SetLocation;
