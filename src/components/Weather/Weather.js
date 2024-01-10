import "./css/Weather.css";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import React, { useState, useEffect } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

function Weather({ searchData }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [openForecast, setOpenForecast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchData && searchData.value) {
          const [lat, lon] = searchData.value.split(" ");
          const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`),
            fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`),
          ]);
  
          const currentWeatherData = await currentWeatherResponse.json();
          const forecastData = await forecastResponse.json();
  
          setCurrentWeather({
            city: searchData.label,
            ...currentWeatherData,
          });
          setForecast({
            city: searchData.label,
            ...forecastData,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [searchData]);
  function handleCurWeatherClick() {
    setOpenForecast((prev) => !prev);
  console.log("forecast", openForecast ? "closed" : "open");
  }
  return (
    <div>
      <div className="container">
        {currentWeather && (
          <CurrentWeather
            data={currentWeather}
            onClick={handleCurWeatherClick}
          />
        )}
        {/* ! '{}' these are for if no data component doesnt open */}
        {forecast && openForecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default Weather;
