import "./css/Weather.css";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import React, { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

function Weather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  function handleOnSearchChange(searchData) {
    //handles City data in this upper component
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const currentWeatherResponse = await response[0].json();
        const ForecastResponse = await response[1].json();

        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForecast({ city: searchData.label, ...ForecastResponse });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {/* ! '{}' these are for if no data component doesnt open */}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default Weather;
