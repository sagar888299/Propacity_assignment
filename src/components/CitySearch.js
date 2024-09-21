import React from "react";

export default function CitySearch({
  city,
  handleCityInput,
  handleSearch,
  handleCitySelect,
  isDropdownOpen,
  filteredCities,
}) {
  return (
    <form onSubmit={handleSearch} className="mb-5 flex relative">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-l-lg w-full"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityInput}
      />
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 text-white rounded-r-lg"
      >
        Search
      </button>
      {isDropdownOpen && filteredCities.length > 0 && (
        <div className="absolute text-left bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10 mt-11">
          {filteredCities.map((cityName, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleCitySelect(cityName)}
            >
              {cityName}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
