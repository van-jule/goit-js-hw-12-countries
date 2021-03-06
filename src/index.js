import './sass/main.scss';
import fetchCountry from './fetchCountries';
import getRefs from './refs';

import { error, defaultModules, Stack } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

import { debounce } from 'debounce';

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();

const handlerInput = e => {
  refs.container.innerHTML = '';

  const search = e.target.value.trim();

  fetchCountry(search)
    .then(countries => renderCollection(countries))
    .catch(error => console.log(error));
};

refs.input.addEventListener('input', debounce(handlerInput, 500));

function renderCollection(arr) {
  if (arr.length === 1) {
    createItem(arr[0]);
  }
  if (arr.length > 1 && arr.length <= 10) {
    createList(arr);
  }
  if (arr.length > 10) {
    error({
      text: 'Too many matches found. Please a more specific query!',
    });
  }
  if (arr.length === undefined) {
    const text = `<p class='not-found'>Please enter a valid request</p>`;
    refs.container.insertAdjacentHTML('beforeend', text);
  }
}

function createList(arr) {
  const list = `<ul>
  ${arr.map(({ name }) => `<li class="language-list__item">${name}</li>`).join(' ')}
</ul>`;

  refs.container.insertAdjacentHTML('beforeend', list);
}

function createItem({ name, capital, population, languages, flag }) {
  const country = `
  <div class="country">
    <h1 class="country__title">${name}</h1>
    <div class="country__info">
      <div class="country__text">
        <h2 class ="country__subtitle">Capital:<span class="country__value"> ${capital}</span></h2>
        <h2 class ="country__subtitle">Population: <span class="country__value">${population}</span></h2>
        <ul class="language-list">Languages:
          ${getLanguages(languages)}
        </ul>
      </div>   
      <img class="country__flag" src="${flag}" alt="${name}"/>
    </div>
  </div>`;

  refs.container.insertAdjacentHTML('beforeend', country);
}

function getLanguages(languages) {
  return languages.map(({ name }) => `<li class="language-list__item">${name}</li>`).join(' ');
}
