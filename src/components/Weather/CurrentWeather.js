import React, { useState } from "react";
import "./css/CurrentWeather.css";

function CurrentWeather({ data }) {
  //! ALWAYS FIRST LETTER CAPS
console.log(data)
  function convertUnixToReadable(unixTimestamp) {
    const sunsetTimeUTC = new Date(unixTimestamp * 1000);
    const sunsetTimeLisbon = sunsetTimeUTC.toLocaleString('en-US', {
      timeZone: 'Europe/Lisbon',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    return `${sunsetTimeLisbon} `;
  };
  const readableSunsetTime = convertUnixToReadable(data.sys.sunset);

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city"> {data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icons"
          src={require(`./icons/${data.weather[0].icon}.png`)}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp*10)/10}ºC</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Sunset</span>
            <span className="parameter-value">{readableSunsetTime}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels Like</span>
            <span className="parameter-value">{Math.round(data.main.feels_like*10)/10}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
