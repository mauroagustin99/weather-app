import { showPlace } from './domcontroller.js';

export async function fetchWeather(query) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=32c952d6c80e48859c1224037241906&q=${query}&aqi=no`,
      { mode: 'cors' }
    );
    const data = await response.json();
    console.log(data);
    const selectedData = {
      location: {
        name: data.location.name,
        country: data.location.country,
      },
      current: {
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
        wind_kph: data.current.wind_kph,
      },
    };
    showPlace(selectedData.location.name, selectedData.location.country);
    return selectedData;
  } catch (error) {
    alert(error);
  }
}

export async function fetchForecast(query) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=32c952d6c80e48859c1224037241906&q=${query}&days=3&aqi=no&alerts=no`,
      { mode: 'cors' }
    );

    const data = await response.json();
    const selectedData = {
      location: {
        name: data.location.name,
        country: data.location.country,
      },
      current: {
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
        wind_kph: data.current.wind_kph,
      },
    };
    return selectedData;
  } catch (error) {
    alert(error);
  }
}
