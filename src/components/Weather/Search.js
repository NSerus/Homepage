import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "./api";
import "./css/Search.css";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  function handleOnChange(searchData) {
    //Handles Data search in the upper component
    onSearchChange(searchData); //Recieves data and sends to upper component
  }

  async function loadOptions(inputValue) {
    // when clicked i will get the values i need
    try {
      const response = await fetch(
        `${GEO_API_URL}?minPopulation=100000&limit=10&namePrefix=${inputValue}`,
        geoApiOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      const options = responseData.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`, //gonna need these for openmaps
          label: `${city.name}, ${city.countryCode}`, // to show in options
        };
      });
      return {
        options,
        responseData,
      };
    } catch (error) {
      console.error(error);
      return { options: [], hasMore: false };
    }
  }

  return (
    <AsyncPaginate
      className="search"
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  );
}

export default Search;
