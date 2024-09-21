import React from "react";
import { pageNotFound } from "../Assests/Images/index"; // Adjust the path accordingly

export default function WeatherNotFound() {
  return (
    <div className="text-center">
      <img src={pageNotFound} alt="No weather data" className="h-32 w-32 mx-auto" />
      <p className="text-gray-500 mt-5">No data available for the selected city</p>
    </div>
  );
}
