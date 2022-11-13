import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImages, perPage } from './fetchImages';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchBox = document.querySelector("#search-form");
const inputArea = document.querySelector("#search-form input");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");

let page = 1;
var lightbox;

function showMatchingImages(image) {
    const markup = image.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<a class="photo-card" href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" width=400px height=250px/>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes:</b> ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views:</b> ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments:</b> ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads:</b> ${downloads}
                        </p>
                    </div>
                </a>`;
    })
    .join("");
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox = new SimpleLightbox('.gallery a');
};

function searchAndShowImages() {
    const inputedValue = inputArea.value.trim();
    gallery.innerHTML = "";
    loadMoreButton.style.visibility = "hidden";
    if (inputedValue.length !== 0) {
        fetchImages(inputedValue)
            .then(data => {
                const limit = data.totalHits / perPage;
                if (data.totalHits !== 0){
                    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
                    showMatchingImages(data);
                    if (limit > 1) {
                        loadMoreButton.style.visibility = "visible";
                    }
                } else {
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                }
            })
    } 
};

function showMoreImages() {
    const inputedValue = inputArea.value.trim();
    fetchImages(inputedValue)
        .then(data => {
            const limit = data.totalHits / perPage;
            if (limit >= page) {
                showMatchingImages(data);
            } else {
                loadMoreButton.style.visibility = "hidden";
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            }
        })
}



searchBox.addEventListener('submit', (event) => {
    event.preventDefault();
    searchAndShowImages();
});

loadMoreButton.addEventListener('click', () => {
    page += 1;
    showMoreImages();
});

export { page };  