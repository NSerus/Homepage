import React from "react";
import "./css/CurrentWeather.css";

function CurrentWeather() {
  // ALWAYS FIRST LETTER CAPS
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city"> Porto</p>
          <p className="weather-description">Sunny</p>
        </div>
        <img
          alt="weather"
          className="weather-icons"
          src={require("./icons/01d.png")}
        />
      </div>
      <div className="bottom">
        <p className="temperature">18ºC</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels Like</span>
            <span className="parameter-value">22ºC</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">2 m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">80%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">15 hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
