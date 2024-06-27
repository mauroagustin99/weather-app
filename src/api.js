import { showForecast, showNowWeather, showPlace } from './domcontroller.js';

export async function fetchWeather(query, unit) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=32c952d6c80e48859c1224037241906&q=${query}`,
      { mode: 'cors' }
    );
    const data = await response.json();

    await showPlace(
      data.location.name,
      data.location.region,
      data.location.country,
      data.location.localtime
    );

    if (unit) {
      await showNowWeather(
        data.current.condition.icon,
        data.current.temp_c,
        data.current.condition.text,
        data.current.feelslike_c,
        data.current.humidity,
        data.current.wind_kph,
        unit
      );
    } else {
      await showNowWeather(
        data.current.condition.icon,
        data.current.temp_f,
        data.current.condition.text,
        data.current.feelslike_f,
        data.current.humidity,
        data.current.wind_mph,
        unit
      );
    }

    // code to change from °C to °F {}
  } catch (error) {
    console.error('Error fetching the weather data:', error);
    alert('Error fetching the weather data');
  }
}

export async function fetchForecast(query, unit) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=32c952d6c80e48859c1224037241906&q=${query}&days=3`,
      { mode: 'cors' }
    );
    const data = await response.json();

    await showForecast(data, unit);
  } catch (error) {
    console.error('Error fetching the forecast data:', error);
    alert('Error fetching the forecast data', error);
  }
}

export async function fetchWeatherByCoordinates(latitude, longitude, unit) {
  try {
    const apiKey = '32c952d6c80e48859c1224037241906';
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`,
        { mode: 'cors' }
      ),
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3`,
        { mode: 'cors' }
      ),
    ]);

    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();

    await showPlace(
      currentWeatherData.location.name,
      currentWeatherData.location.region,
      currentWeatherData.location.country,
      currentWeatherData.location.localtime
    );
    if (unit) {
      await showNowWeather(
        currentWeatherData.current.condition.icon,
        currentWeatherData.current.temp_c,
        currentWeatherData.current.condition.text,
        currentWeatherData.current.feelslike_c,
        currentWeatherData.current.humidity,
        currentWeatherData.current.wind_kph,
        unit
      );
    } else {
      await showNowWeather(
        currentWeatherData.current.condition.icon,
        currentWeatherData.current.temp_f,
        currentWeatherData.current.condition.text,
        currentWeatherData.current.feelslike_f,
        currentWeatherData.current.humidity,
        currentWeatherData.current.wind_mph,
        unit
      );
    }

    await showForecast(forecastData, unit);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
