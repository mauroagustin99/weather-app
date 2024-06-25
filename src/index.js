document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello world!');

  async function fetchWeather(query) {
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
      console.log(selectedData);
    } catch (error) {
      console.log(error);
    }
  }
  const searchPlaceInput = document.querySelector('#search-place');
  const searchPlaceBtn = document.querySelector('#search-place-btn');

  searchPlaceBtn.addEventListener('click', () => {
    const query = searchPlaceInput.value.trim();
    console.log(query);
    if (query) {
      fetchWeather(query);
    }
  });

  fetchWeather('London');
});
