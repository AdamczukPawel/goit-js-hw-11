import axios from "axios";
import { page } from './index.js';


const URL_API_REST_IMAGES = 'https://pixabay.com/api/?key=31160282-9f066dbbb8437aff750d2a45a';

let per_page = 40;
let page = 1;
// let limit = 500/per_page;

function fetchImages(name) {
    return fetch(URL_API_REST_IMAGES + `&per_page=${per_page}&page=${page}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => response.json())
};

export { fetchImages };
