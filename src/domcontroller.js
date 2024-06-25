const placeName = document.querySelector('.place-name');
const countryName = document.querySelector('.country-name');

export function showPlace(name1, name2) {
  placeName.textContent = name1;
  countryName.textContent = name2;
}
