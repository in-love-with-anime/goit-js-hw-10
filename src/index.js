import countriesTplList from './templates/countryTpl.hbs';
import currentCountryTpl from './templates/current_country.hbs';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;

const getRefs = {
    inputSearch: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};


getRefs.inputSearch.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));

function onCountriesFetch(evt) {
  const inputValue = evt.target.value.trim();
  if (inputValue.length === 0) {
getRefs.countryList.innerHTML = '';
    return;
  } else {
    fetchCountries(inputValue)
      .then(appendCountriesMarkup)
        .catch( () => {
            getRefs.countryList.innerHTML = "";
            Notify.failure('Oops, there is no country with that name');
        });
  }
}

function appendCountriesMarkup(countries) {
    if (countries.length > 9) {
    getRefs.countryList.innerHTML = "";
    return Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (countries.length === 1) {
    getRefs.countryList.innerHTML = currentCountryTpl(countries[0]);
  } else {
    getRefs.countryList.innerHTML = countriesTplList(countries);
  }
}