import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiUrl, geoApiOptions } from "./api";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  function handleOnChange(searchData) {
    //Handles Data search in the upper component
    setSearch(searchData);
    onSearchChange(searchData); //Recieves data and sends to upper component 
  }

  async function loadOptions(inputValue) {
    try {
      const response = await fetch(
        `${geoApiUrl}?minPopulation=100000&limit=10&namePrefix=${inputValue}`,
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
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}

export default Search;
