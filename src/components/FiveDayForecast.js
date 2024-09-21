import React from "react";

export default function FiveDayForecast({
  weatherData,
  convertTemp,
  isCelsius,
}) {
  return (
    <div>
      <h2 className="mt-8 text-2xl font-semibold">5-Day Forecast</h2>
      <div className="space-y-4 mt-4">
        {weatherData.forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="flex flex-wrap-reverse items-center justify-between p-3 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-lg"
          >
            <span>
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })}
            </span>
            <span>
              {convertTemp(day.day.mintemp_c).toFixed(1)}°/
              {convertTemp(day.day.maxtemp_c).toFixed(1)}°
            </span>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="h-10 w-10"
            />
            <span>{day.day.condition.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
