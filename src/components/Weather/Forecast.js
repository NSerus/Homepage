import React from "react";
import "./css/Forecast.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

function Forecast({ data }) {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    //slice extracts portion of this tomorrow till end of week
    WEEK_DAYS.slice(0, dayInAWeek) // concat adds the rest of the days until this day next week
  );
  console.log(data)

  return (
    <>
      <Accordion allowZeroExpanded>
        {/* 'allowZeroExpanded' allows accordion to close */}
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={require(`./icons/${item.weather[0].icon}.png`)}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day"> {forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="max">
                  🌡️ {Math.round(item.main.temp_max)}ºC / 💧 {item.pop}%
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
            <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Feels Like</label>
                  <label>{item.main.feels_like} ºC</label>
                </div>
              </div>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
              </div>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
              </div>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Wind Speed</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default Forecast;
