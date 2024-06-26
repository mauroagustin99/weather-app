import { addMinutes, format, isToday, parseISO } from 'date-fns';

import background1 from '../img/pexels-aayushrawat-5657878.jpg';
import background2 from '../img/pexels-souvenirpixels-1561322.jpg';

import thermometer from './img/thermometer.svg';
import waterPercent from './img/water-percent.svg';
import weatherWind from './img/weather-windy.svg';
import arrowUp from './img/arrow-up-bold.svg';
import arrowDown from './img/arrow-down-bold.svg';

const placeName = document.querySelector('.place-name');
const countryName = document.querySelector('.country-name');
const localTime = document.querySelector('.local-time');
const regionName = document.querySelector('.region-name');

const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp-api');
const condition = document.querySelector('.now-condition');
const feelsLike = document.querySelector('.feels-like-api');
const humidity = document.querySelector('.humidity-api');
const wind = document.querySelector('.wind-api');

const feelsLikeContainer = document.querySelector('.feels-like');
const thermometerSvg = document.createElement('img');
thermometerSvg.src = thermometer;
thermometerSvg.classList.add('icons');

const humidityContainer = document.querySelector('.humidity');
const humiditySvg = document.createElement('img');
humiditySvg.src = waterPercent;
humiditySvg.classList.add('icons');

const windContainer = document.querySelector('.wind');
const windSvg = document.createElement('img');
windSvg.src = weatherWind;
windSvg.classList.add('icons');

export function showPlace(place1, place2, place3, place4) {
  const dateTime = new Date(place4);
  const formattedDateTime = format(dateTime, 'eeee, MMMM do, yyyy, hh:mm a');

  placeName.textContent = place1;
  regionName.textContent = place2;
  countryName.textContent = place3;
  localTime.textContent = formattedDateTime;
}

export function showNowWeather(
  nowinfo1,
  nowinfo2,
  nowinfo3,
  nowinfo4,
  nowinfo5,
  nowinfo6,
  unit
) {
  if (unit) {
    weatherIcon.src = nowinfo1;
    temp.innerHTML = `${nowinfo2}°C`;
    condition.textContent = nowinfo3;
    feelsLike.innerHTML = `${nowinfo4}°C`;

    humidity.textContent = nowinfo5;
    wind.innerHTML = `${nowinfo6} kph`;
  } else {
    weatherIcon.src = nowinfo1;
    temp.innerHTML = `${nowinfo2}°F`;
    condition.textContent = nowinfo3;
    feelsLike.innerHTML = `${nowinfo4}°F`;
    humidity.textContent = nowinfo5;
    wind.innerHTML = `${nowinfo6} mph`;
  }
  feelsLikeContainer.appendChild(thermometerSvg);
  humidityContainer.appendChild(humiditySvg);
  windContainer.appendChild(windSvg);
}

export function showForecast(data, unit) {
  const forecastSection = document.querySelector('.forecast');
  forecastSection.innerHTML = '';
  const forecast = data.forecast.forecastday;
  forecast.forEach((day) => {
    const dateNoFormat = day.date;

    const newDate = parseISO(dateNoFormat); // Convert API Date to an object Date
    const newDateUTC = addMinutes(newDate, newDate.getTimezoneOffset()); // Adjust the date to UTC

    let date; // Add date logic
    if (isToday(newDateUTC)) {
      date = 'Today';
    } else {
      date = format(newDateUTC, 'eeee, MMMM do');
    }

    const icon = day.day.condition.icon;
    const condition = day.day.condition.text;
    let maxTemp;
    let minTemp;

    const weatherDiv = document.createElement('div');

    if (unit) {
      maxTemp = day.day.maxtemp_c;
      minTemp = day.day.mintemp_c;
      weatherDiv.innerHTML = `
      <h3>${date}</h3>
      <img src="${icon}"/>
      <p>${condition}</p>
      <div class="max-temp">Max Temp: ${maxTemp}°C</div>
      <div class="min-temp">Min Temp: ${minTemp}°C</div>
    `;
    } else {
      maxTemp = day.day.maxtemp_f;
      minTemp = day.day.mintemp_f;
      weatherDiv.innerHTML = `
      <h3>${date}</h3>
      <img src="${icon}"/>
      <p>${condition}</p>
      <div class="max-temp">Max Temp: ${maxTemp}°F</div>
      <div class="min-temp">Min Temp: ${minTemp}°F</div>
    `;
    }

    weatherDiv.classList.add('forecast-card');
    const arrowupSvg = document.createElement('img');
    arrowupSvg.src = arrowUp;
    arrowupSvg.classList.add('icons');

    const arrowdownSvg = document.createElement('img');
    arrowdownSvg.src = arrowDown;
    arrowdownSvg.classList.add('icons');

    const arrowupContainers = weatherDiv.querySelectorAll('.max-temp');
    const arrowdownContainers = weatherDiv.querySelectorAll('.min-temp');

    arrowupContainers.forEach((container) => {
      container.appendChild(arrowupSvg.cloneNode(true));
    });

    arrowdownContainers.forEach((container) => {
      container.appendChild(arrowdownSvg.cloneNode(true));
    });
    forecastSection.appendChild(weatherDiv);
  });
}

const wallpapers = [`url(${background1})`, `url(${background2})`];
export function changeWallpaper() {
  const randomIndex = Math.floor(Math.random() * wallpapers.length);
  document.body.style.backgroundImage = wallpapers[randomIndex];
}
