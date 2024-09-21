import React from "react";

export default function CurrentWeather({
  weatherData,
  isCelsius,
  convertTemp,
}) {
  return (
    <div className="flex justify-center lg:justify-between md:justify-between sm:justify-between items-center flex-wrap-reverse">
      <div>
        <span className="text-6xl font-bold">
          {convertTemp(weatherData.current.temp_c).toFixed(1)}°
          {isCelsius ? "C" : "F"}
        </span>
        <span className="font-semibold mt-1 block">
          {weatherData.location.name}, {weatherData.location.country}
        </span>
      </div>
      <img
        src={weatherData.current.condition.icon}
        alt={weatherData.current.condition.text}
        className="h-28 w-28"
      />
    </div>
  );
}
