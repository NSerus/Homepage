export class ForecastLogic {
  static async Handler(forecastData) {
    // Declare variables

    let logDate;
    let forecastResolvedData = [];
    let forecastDescs = new Map();
    let forecastDayData = {
      temp_max: 0, //max
      temp_min: 100, //min
      description: "", //most used
      precipitation: 0, // AVG
      feels_like: 0, //avg
      humidity: 0, //avg
      clouds: 0, // avg
      windspeed: 0, //avg
      counter: 0,
      date: "",
    };

    if (forecastData != null) {
      //needs data
      forecastData.list.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0];
        if (date == logDate) {
          //get data for date

          //Max and Min Temps
          forecastDayData.date = date;
          if (forecastDayData.temp_max < forecast.main.temp_max)
            forecastDayData.temp_max = forecast.main.temp_max;
          if (forecastDayData.temp_min > forecast.main.temp_min)
            forecastDayData.temp_min = forecast.main.temp_min;

          // Avg Values
          forecastDayData.precipitation += forecast.pop;
          forecastDayData.feels_like += forecast.main.feels_like;
          forecastDayData.humidity += forecast.main.humidity;
          forecastDayData.clouds += forecast.clouds.all;
          forecastDayData.windspeed += forecast.wind.speed;

          forecastDayData.counter++;

          // Description Manipulation
          let count = forecastDescs.get(forecast.weather[0].description) || 0;
          forecastDescs.set(forecast.weather[0].description, count + 1);

        } else { //Final processing and add to Final array

          //avg calculation
          forecastDayData.precipitation = Math.round(
            forecastDayData.precipitation / forecastDayData.counter
          );
          forecastDayData.feels_like =
            Math.round(
              (forecastDayData.feels_like / forecastDayData.counter) * 100
            ) / 100;
          forecastDayData.humidity = Math.round(
            forecastDayData.humidity / forecastDayData.counter
          );
          forecastDayData.clouds = Math.round(
            forecastDayData.clouds / forecastDayData.counter
          );
          forecastDayData.windspeed =
            Math.round(
              (forecastDayData.windspeed / forecastDayData.counter) * 100
            ) / 100;

          // Find the most repeated description
          let maxCount = 0;
          let mostRepeatedDescription = "";
          forecastDescs.forEach((count, description) => {
            if (count > maxCount) {
              maxCount = count;
              mostRepeatedDescription = description;
            }
          });
          forecastDayData.description = mostRepeatedDescription;

          //Add to final array and reset values
          forecastResolvedData.push(forecastDayData);

          forecastDayData = {
            temp_max: 0,
            temp_min: 100,
            description: "",
            precipitation: 0,
            feels_like: 0,
            humidity: 0,
            clouds: 0,
            windspeed: 0, //avg
            counter: 0,
            date: "",
          };
          logDate = date;
          forecastDescs = new Map();
        }
      });
    }
    forecastResolvedData.shift(); //shift to remove first wrong array value (the [0])
    return forecastResolvedData;
  }
}
