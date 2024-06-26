import './style.css';
import './toggle.css';
import { fetchWeather, fetchForecast } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchPlaceInput = document.querySelector('#search-place');
  const searchPlaceBtn = document.querySelector('#search-place-btn');

  const unitChanger = document.querySelector('.checkbox');
  let unit = true;
  unitChanger.checked = false; //Checkbox starts always in °C
  let currentQuery = 'Rosario';

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

  fetchWeather(currentQuery, unit);
  fetchForecast(currentQuery, unit);
});
