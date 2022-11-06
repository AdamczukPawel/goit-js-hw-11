import './css/styles.css';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { fetchCountries } from './fetchCountries.js';

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

function showMatchingCountries(country) {
    const markup = country
    .map(({ name, flags }) => {
        return `<li class="country-list-element">
            <img src = ${flags.svg} alt=${ name.common }'s flag' width=30px height=20px/>
            ${name.common}
        </li>`;
    })
    .join("");
  countryList.insertAdjacentHTML('afterbegin', markup);
}

function showMatchingCountryInformations(country) {
    const markupInfo = country.map(({name, flags, capital, languages, population}) => {
        return `<h1><img class="big-flag" src=${flags.svg} alt=${name.common}'s flag' width=50px height=30px/>${name.common}</h1>
        <ul>
        <li class="coutry-data"><span class="coutry-data-type">Capital: </span>${capital}</li>
        <li class="coutry-data"><span class="coutry-data-type">Population: </span>${population}</li>
        <li class="coutry-data"><span class="coutry-data-type">Languages: </span>${Object.values(languages)}</li>
        </ul>`
    })
    countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
}

function searchAndShowCountries(event) {
    const inputedValue = event.target.value.trim();
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    if (inputedValue.length !== 0) {
        fetchCountries(inputedValue)
            .then(data => {
                if (data.status === 404) {
                    Notiflix.Notify.failure("Oops, there is no country with that name");
                } else {
                    if (data.length > 10) {
                        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                    } else if (data.length >= 2 && data.length <= 10) {
                        showMatchingCountries(data)
                    } else if (data.length = 1) {
                        showMatchingCountryInformations(data)
                    }
                }
})
    }
};

searchBox.addEventListener('input', debounce(searchAndShowCountries, DEBOUNCE_DELAY))