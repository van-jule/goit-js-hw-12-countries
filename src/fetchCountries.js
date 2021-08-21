const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(value) {
  return fetch(`${BASE_URL}/name/${value}`).then(response => response.json());
}

export default fetchCountry;
