import axios from "axios";
import { page } from './index.js';


const URL_API_REST_IMAGES = 'https://pixabay.com/api/?key=31160282-9f066dbbb8437aff750d2a45a';
let perPage = 40;   

const OPTIONS = new URLSearchParams({
    per_page: perPage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
});

async function fetchImages(name) {
  try {
    const response = await axios.get(
      `${URL_API_REST_IMAGES + '&q=' + name + '&page=' + page + OPTIONS}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchImages, perPage };