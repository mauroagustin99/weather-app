import './style.css';
import './toggle.css';
import { fetchWeather, fetchForecast } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchPlaceInput = document.querySelector('#search-place');
  const searchPlaceBtn = document.querySelector('#search-place-btn');

  searchPlaceBtn.addEventListener('click', () => {
    const query = searchPlaceInput.value.trim();
    if (query) {
      fetchWeather(query);
      fetchForecast(query);
    }
  });

  fetchWeather('London');
});
