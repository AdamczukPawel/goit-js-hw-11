import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages';

const searchBox = document.querySelector("#search-form");
const inputArea = document.querySelector("#search-form input");
const gallery = document.querySelector(".gallery");

function showMatchingImages(image) {
    const markup = image.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            <p>${likes}</p>
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            <p>${views}</p>
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            <p>${comments}</p>
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            <p>${downloads}</p>
                        </p>
                    </div>
                </div>`;
    })
    .join("");
  gallery.insertAdjacentHTML('afterbegin', markup);
}

function searchAndShowImages() {
    const inputedValue = inputArea.value.trim();
    gallery.innerHTML = "";
    if (inputedValue.length !== 0) {
        fetchImages(inputedValue)
            .then(data => {
                // console.log(data.totalHits)
                Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images`);
                showMatchingImages(data);
            })
    } else {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
};

searchBox.addEventListener('submit', (event) => {
    event.preventDefault();
    searchAndShowImages()
})