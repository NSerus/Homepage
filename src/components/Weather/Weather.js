import "./css/Weather.css";
import Search from "./Search";
import React from "react";

function Weather() {
  function handleOnSearchChange(searchData){  //handles City data in this upper component
    console.log(searchData)
  }

  return (
    <div>
      <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      </div>
    </div>
  );
}

export default Weather;
