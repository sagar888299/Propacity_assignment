import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "./Skeleton";
import CitySearch from "./CitySearch";
import TemperatureToggle from "./TemperatureToggle";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import FiveDayForecast from "./FiveDayForecast";
import WeatherNotFound from "./WeatherNotFound";
import {
  CITIES,
  AQI,
  LOCAL_STORAGE_CITY_KEY,
  LOCAL_STORAGE_DATA_KEY,
  ALERTS,
  DAYS_FORECAST,
  DEFAULT_CITY,
  DEFAULT_ERROR_MESSAGE,
  SMOOTH,
} from "./Constant";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;

export default function Home() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false);
  const hourlyRef = useRef(null);

  const fetchWeatherData = async (city) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${weatherUrl}&q=${city}&days=${DAYS_FORECAST}&aqi=${AQI}&alerts=${ALERTS}`
      );
      setWeatherData(response.data);
      saveToLocalStorage(city, response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToLocalStorage = (city, data) => {
    localStorage.setItem(LOCAL_STORAGE_CITY_KEY, city);
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
  };

  const handleError = (error) => {
    toast.error(error?.response?.data?.error?.message || DEFAULT_ERROR_MESSAGE);
  };

  useEffect(() => {
    const cachedCity = localStorage.getItem(LOCAL_STORAGE_CITY_KEY);
    const cachedWeatherData = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);

    if (cachedCity && cachedWeatherData) {
      setCity(cachedCity);
      setWeatherData(JSON.parse(cachedWeatherData));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
      setIsDropdownOpen(false);
    }
  };

  const toggleTemperatureUnit = () => setIsCelsius(!isCelsius);

  const convertTemp = (tempCelsius) =>
    isCelsius ? tempCelsius : (tempCelsius * 9) / 5 + 32;

  const handleCityInput = (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);
    if (inputValue.trim() !== "") {
      const filtered = CITIES.filter((c) =>
        c.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCities(filtered);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    fetchWeatherData(selectedCity);
    setFilteredCities([]);
    setIsDropdownOpen(false);
  };

  const scrollLeft = () => {
    hourlyRef.current.scrollBy({ left: -100, behavior: SMOOTH });
  };

  const scrollRight = () => {
    hourlyRef.current.scrollBy({ left: 100, behavior: SMOOTH });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40 relative">
        <h1 className="text-3xl font-bold mb-5">Weather Forecast</h1>
        <CitySearch
          city={city}
          handleCityInput={handleCityInput}
          handleSearch={handleSearch}
          handleCitySelect={handleCitySelect}
          isDropdownOpen={isDropdownOpen}
          filteredCities={filteredCities}
        />
        {isLoading ? (
          <Skeleton />
        ) : weatherData ? (
          <>
            <TemperatureToggle
              isCelsius={isCelsius}
              toggleTemperatureUnit={toggleTemperatureUnit}
            />
            <CurrentWeather
              weatherData={weatherData}
              isCelsius={isCelsius}
              convertTemp={convertTemp}
            />
            <HourlyForecast
              hourlyRef={hourlyRef}
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
              weatherData={weatherData}
              convertTemp={convertTemp}
              isCelsius={isCelsius}
            />
            <FiveDayForecast
              weatherData={weatherData}
              convertTemp={convertTemp}
              isCelsius={isCelsius}
            />
          </>
        ) : (
          <WeatherNotFound />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
}
