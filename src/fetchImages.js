import axios from "axios";
import { page } from './index.js';


const URL_API_REST_IMAGES = 'https://pixabay.com/api/?';
let perPage = 40; 

async function fetchImages(name) {
  const OPTIONS = new URLSearchParams({
    key: "31160282-9f066dbbb8437aff750d2a45a",
    q: name,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: perPage    
    });
    try {
      const response = await axios.get(URL_API_REST_IMAGES + OPTIONS);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
}

export { fetchImages, perPage };