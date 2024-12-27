import React, { useState, useEffect } from "react";
import axios from "axios";
import WeeklyComparisonChart from "./WeeklyComparisonChart"; // Import your chart component

const WeeklyDataContainer = () => {
  const [weeklyData, setWeeklyData] = useState([]); // State to store weekly data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from your API
  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/order/weekly-data"); // Replace with your API endpoint
        setWeeklyData(response.data); // Assuming API returns data in the required format
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weekly data:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []); // Empty dependency array to fetch data once

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>{error}</p>; // Show error message

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Weekly Orders and Sales</h1>
      <WeeklyComparisonChart weeklyData={weeklyData} />
    </div>
  );
};

export default WeeklyDataContainer;
