import React, { useState, useEffect } from "react";
import "./css/Settings.css";
import Search from "./Weather/Search";

import { WEATHER_API_KEY, WEATHER_API_URL } from "./Weather/api";

function Settings({ onSettingsChange, onPomoChange }) {
  const [openSettings, setOpenSettings] = useState(false);
  const [burger_class, setBurgerClass] = useState("burger_bar unclicked");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [pomoInput, setPomoInput] = useState(25);
  const [breakInput, setBreakInput] = useState(5);

  function handleOnSearchChange(searchData) {
    //handles City data in this upper component and sends to App
    onSettingsChange(searchData);

    setOpenSettings(false);
    setIsMenuClicked(false);
    setBurgerClass("burger_bar unclicked");
  }

  //? Updates Menus icon
  function updateMenu() {
    if (!isMenuClicked) {
      setBurgerClass("burger_bar clicked");
    } else {
      setBurgerClass("burger_bar unclicked");
    }
    setIsMenuClicked(!isMenuClicked);
  }

  // Closes settings if clicked outside the menu or enter
  useEffect(() => {
    const handleBodyClick = (e) => {
      if (
        openSettings &&
        !e.target.closest(".menu") &&
        !e.target.closest(".burger_menu") &&
        e.target.closest(".burger_menu")
      ) {
        setOpenSettings(false);
        setIsMenuClicked(false);
        setBurgerClass("burger_bar unclicked");
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [openSettings]);

  // Toggles settings open and closed
  function handleSettingsClick(e) {
    setOpenSettings((prev) => !prev);
    e.stopPropagation(); // Stop the click event from reaching the parent div
    updateMenu(e);
  }

  // Prevents settings from closing when clicking inside the menu
  function handleSearchClick(e) {
    e.stopPropagation(); // Stop the click event from reaching the parent div
  }

  function onPomoInputChange(event) {

    const inputValue = event.target.value;
    setPomoInput(inputValue);
    onPomoChange( inputValue, breakInput);
  }
  function onBreakInputChange(event) {
    const inputValue = event.target.value;
    setBreakInput(inputValue);
    onPomoChange(pomoInput, inputValue);

  }

  return (
    <div className="settings">
      {openSettings && (
        <ul className="menu" onClick={handleSearchClick}>
          <li>
            Pomo
            <input
              type="number"
              value={pomoInput}
              required
              onChange={onPomoInputChange}
              className="pomo-settings"
            ></input>
          </li>
          <li>
            Break
            <input
              type="number"
              value={breakInput}
              required
              onChange={onBreakInputChange}
              className="pomo-settings"
            ></input>
          </li>
          <li>City</li>
          <li>
            <Search
              className="search-city"
              onSearchChange={handleOnSearchChange}
            />
          </li>
        </ul>
      )}
      <div
        className="burger_menu"
        onClick={(e) => {
          handleSettingsClick(e);
          updateMenu(e);
        }}
      >
        <div className={burger_class}></div>
        <div className={burger_class}></div>
        <div className={burger_class}></div>
      </div>
    </div>
  );
}

export default Settings;
