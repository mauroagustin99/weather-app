import './style.css';
import './toggle.css';
import './options.css';
import './forecast.css';
import locationSvg from './img/crosshairs.svg';
import {
  fetchWeather,
  fetchForecast,
  fetchWeatherByCoordinates,
} from './api.js';
import { changeWallpaper } from './domcontroller.js';

document.addEventListener('DOMContentLoaded', () => {
  changeWallpaper();
  const localizationBtn = document.querySelector('#getLocationBtn');

  const locationImg = document.createElement('img');
  locationImg.classList.add('get-location');
  locationImg.src = locationSvg;
  localizationBtn.appendChild(locationImg);

  const searchPlaceInput = document.querySelector('.search-place');
  const searchPlaceBtn = document.querySelector('.search-place-btn');

  const unitChanger = document.querySelector('.checkbox');
  let unit = true;
  unitChanger.checked = false; //Checkbox starts always in °C
  let currentQuery = 'Rosario';

  // Search by enter button
  searchPlaceInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = searchPlaceInput.value.trim();
      currentQuery = query;
      if (query) {
        fetchWeather(query, unit);
        fetchForecast(query, unit);
      }
    }
  });
  // Search by click the icon
  searchPlaceBtn.addEventListener('click', () => {
    const query = searchPlaceInput.value.trim();
    currentQuery = query;
    if (query) {
      fetchWeather(query, unit);
      fetchForecast(query, unit);
    }
  });

  //Function: change the unit and re fetch
  unitChanger.addEventListener('change', function () {
    unit = !unit;
    console.log(unit);
    fetchWeather(currentQuery, unit);
    fetchForecast(currentQuery, unit);
  });

  //Search by localization
  localizationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const { locationName } = await fetchWeatherByCoordinates(
              latitude,
              longitude,
              unit
            );
            currentQuery = locationName;
          } catch {
            console.error('Error fetching weather data by coordinates:', error);
            alert('Cannot find user position.');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Cannot find user position.');
        }
      );
    } else {
      alert('Geolocalization not supported.');
    }
  });

  fetchWeather(currentQuery, unit);
  fetchForecast(currentQuery, unit);
});
