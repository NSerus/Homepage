import "./css/Weather.css";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import React, { useState, useEffect } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { IndexDBHandler } from "../DB";
import { ForecastLogic } from "./ForecastLogic";

function Weather({ searchData }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [openForecast, setOpenForecast] = useState(false);

  /* const [searchValues, setSearchValues] = useState();
  setSearchValues(searchData);  */

  // IndexedDB functions

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Handling of DB loading
        const db = await IndexDBHandler.openDB();
        const searchDataArr = await IndexDBHandler.getWeather(db, "weather");
        if (!searchDataArr || searchDataArr.length === 0)
          console.log("No weather data found in IndexedDB");
        else if (!searchData) searchData = searchDataArr[0];

        //Handling of text
        if (searchData && searchData.value) {
          IndexDBHandler.updateInIndexedDB(searchData, "weather");
          // doesn't get data if no data to search
          const [lat, lon] = searchData.value.split(" ");
          console.log(lat);
          const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(
              `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            ),
            fetch(
              `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            ),
          ]);

          const currentWeatherData = await currentWeatherResponse.json();
          const forecastData = await forecastResponse.json();

          setCurrentWeather({
            city: searchData.label,
            ...currentWeatherData,
          });

          console.log(ForecastLogic.Handler(Forecast))

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

    // Fetch data every hour
    const intervalId = setInterval(fetchData, 3600000);
    return () => clearInterval(intervalId);
  }, [searchData]);

  function handleCurWeatherClick() {
    setOpenForecast((prev) => !prev);
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
        {/* ! '{}' these are for if no data component doesn't open */}
        {forecast && openForecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default Weather;
