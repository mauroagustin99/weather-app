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

export function showPlace(place1, place2, place3, place4) {
  placeName.textContent = place1;
  regionName.textContent = place2;
  countryName.textContent = place3;
  localTime.textContent = place4;
}

export function showNowWeather(
  nowinfo1,
  nowinfo2,
  nowinfo3,
  nowinfo4,
  nowinfo5,
  nowinfo6
) {
  weatherIcon.src = nowinfo1;
  temp.textContent = nowinfo2;
  condition.textContent = nowinfo3;
  feelsLike.textContent = nowinfo4;
  humidity.textContent = nowinfo5;
  wind.textContent = nowinfo6;
}

export function showForecast(data, unit) {
  const forecastSection = document.querySelector('.forecast');
  forecastSection.innerHTML = '';
  const forecast = data.forecast.forecastday;
  forecast.forEach((day) => {
    const date = day.date;
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
      <p>Max Temp: ${maxTemp}°C</p>
      <p>Min Temp: ${minTemp}°C</p>
    `;
    } else {
      maxTemp = day.day.maxtemp_f;
      minTemp = day.day.mintemp_f;
      weatherDiv.innerHTML = `
      <h3>${date}</h3>
      <img src="${icon}"/>
      <p>${condition}</p>
      <p>Max Temp: ${maxTemp}°F</p>
      <p>Min Temp: ${minTemp}°F</p>
    `;
    }

    weatherDiv.classList.add('forecast-card');
    forecastSection.appendChild(weatherDiv);
  });
}
