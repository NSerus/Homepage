export class ForecastLogic {
  static async Handler(forecastData) {
    // ! Move this to other class
    let logDate;
    let forecastDayData = {
      temp_max: 0, //max
      temp_min: 100, //min
      description: "", //most used
      precipitation: 0, // AVG
      feels_like: 0, //avg
      humidity: 0, //avg
      clouds: 0, // avg
      windspeed: 0, //avg
      date: "",
    };
    let forecastResolvedData = [];
    let forecastDescs = new Map();
    if (forecastData != null) {
      forecastData.list.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0];
        if (date == logDate) {
          forecastDayData.date = date;
          if (forecastDayData.temp_max < forecast.main.temp_max)
            forecastDayData.temp_max = forecast.main.temp_max;
          if (forecastDayData.temp_min > forecast.main.temp_min)
            forecastDayData.temp_min = forecast.main.temp_min;

          forecastDayData.precipitation += forecast.pop;
          forecastDayData.feels_like += forecast.main.feels_like;
          forecastDayData.humidity += forecast.main.humidity;
          forecastDayData.clouds += forecast.clouds.all;
          forecastDayData.windspeed += forecast.wind.speed;

          if (forecastDescs[forecast.description])
            forecastDescs[forecast.description]++;
          else forecastDescs[forecast.description] = 1;
          console.log(forecastDescs)
        } else {

          //acg calculation
          forecastDayData.precipitation = Math.round(forecastDayData.precipitation / 7);
          forecastDayData.feels_like = Math.round((forecastDayData.feels_like / 7)*100)/100;
          forecastDayData.humidity = Math.round(forecastDayData.humidity / 7);
          forecastDayData.clouds = Math.round(forecastDayData.clouds / 7);
          forecastDayData.windspeed = Math.round((forecastDayData.windspeed / 7) *100)/100;

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
            date: "",
          };
          logDate = date;
          forecastDescs = new Map();
        }

        console.log(forecastResolvedData);
      });
    }

    return forecastResolvedData;
  }
}
