const URL_API_REST_COUNTRIES = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
    return fetch(URL_API_REST_COUNTRIES + name + '?fields=name,capital,population,flags,languages')
        .then(response => response.json())
};

export { fetchCountries };