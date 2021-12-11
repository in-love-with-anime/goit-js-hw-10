import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');


const inputEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const cardContainerEl = document.querySelector('.country-info');



const onCountriesFetch = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue.length === 0) {
        countriesListEl.innerHTML = "";
        return;
    } else {
        fetchCountries(inputValue)
        .then(onMarkupCountryCard)
            .catch( () => {
                countriesListEl.innerHTML = "";
                Notify.failure('Oops, there is no country with that name');
            });
    };
} 

inputEl.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));


// Добавляем разметку
const onMarkupCountryCard = (countries) => {
    if (countries.length > 10) {
        cardContainerEl.innerHTML = "";
        return Notify.info('Too many matches found. Please enter a more specific name.');
    } if (countries.length === 1) {
        cardContainerEl.innerHTML = countryCard(countries[0]);
    } else {
        countriesListEl.innerHTML = countryList(countries);
    }
}