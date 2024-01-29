export class ForecastLogic {


    
    static async Handler(Forecast) {

        // ! Move this to other class
        let logDate;
        let forecastDayData = {
          temp_max: 0,
          temp_low: 0,
          description: "",
          precipitation: 0,
          feels_like: 0,
          humidity: 0,
          clouds: 0,
          windspeed: 0,
        };
        let forecastResolvedData = [];
        let forecastDescs = new Map();

        forecastData.list.forEach((forecast) => {
          const date = forecast.dt_txt.split(" ")[0];
          if (date == logDate) {
            if (forecastDayData.temp_max > forecast.temp_max)
              forecastDayData.temp_max = forecast.temp_max;
            if (forecastDayData.temp_min > forecast.temp_min)
              forecastDayData.temp_min = forecast.temp_min;

            if (forecastDescs[forecast.description])
              forecastDescs[forecast.description]++;
            else forecastDescs[forecast.description] = 1;
            console.log(forecastDayData)
          } else {
            forecastDayData.description = Object.keys(forecastDescs).reduce(
              (a, b) => Math.max(a, forecastDescs(b), -Infinity)
            );
            forecastResolvedData.push(forecastDayData);
            logDate = date;
            forecastDescs = new Map();
          }

          console.log(forecast);
          //! DO DATA MANIPULATION HERE
        });

        return 'ok'
    }
}