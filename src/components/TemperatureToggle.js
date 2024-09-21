import React from "react";

export default function TemperatureToggle({ isCelsius, toggleTemperatureUnit }) {
  return (
    <div className="flex flex-row-reverse justify-between items-center mb-5">
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isCelsius}
        onChange={toggleTemperatureUnit}
      />
      <div className="relative w-11 h-6 bg-pink-400 rounded-full peer dark:bg-purple-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-400"></div>
      <span className="ml-2 text-base font-semibold">
        {" "}
        {isCelsius ? "°C" : "°F"}
      </span>
    </label>
  </div>
  );
}
