import React from "react";

export default function HourlyForecast({
  hourlyRef,
  scrollLeft,
  scrollRight,
  weatherData,
  convertTemp,
  isCelsius,
}) {
  return (
    <div>
      <h2 className="mt-12 text-2xl font-semibold">Hourly Forecast</h2>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 bg-gray-100 p-2 rounded-full"
        >
          ◀
        </button>
        <div
          className="flex overflow-x-auto space-x-20 mt-4 no-scrollbar"
          ref={hourlyRef}
        >
          {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-lg">
                {convertTemp(hour.temp_c).toFixed(1)}°{isCelsius ? "C" : "F"}
              </span>
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className="h-12 w-12"
              />
              <span className="text-sm">
                {new Date(hour.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 bg-gray-100 p-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
