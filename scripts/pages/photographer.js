import { getMediasForPhotographer, getPhotographerById } from "../utils/jsonAPI.js";
import { PopupFactory } from "../factories/popup.js";
import { displayModal } from "../utils/contactForm.js";
import { mediaFactory } from "../factories/media.js";


function init() {
    const searchParams = new URLSearchParams(window.location.search);
    const photographerId = searchParams.get("id");

    const photographerMedia = new PhotographerMedia(photographerId);
    photographerMedia.generateMedia();
}

class PhotographerMedia {
    constructor(photographerId) {
        this.photographerId = photographerId;
    }

    async generateMedia() {
        const id = parseInt(this.photographerId);
        const photographer = await getPhotographerById(id);
        const photographerHeader = document.querySelector(".photograph-header");

        if (!photographer) {
            return location.href = "./";
        }

        this.photographerName = photographer.name;
        this.photographerPrice = photographer.price;
        const photographerArticle = await this.photographerTemplate(photographer);
        photographerHeader.innerHTML = photographerArticle;

        document.querySelector(".contact_button").addEventListener("click", displayModal)

        this.allMedias = await getMediasForPhotographer(id);

        const { articleMedias, numberLikes } = this.mediasTemplate(this.allMedias);
        this.numberLikes = numberLikes;
        document.querySelector(".photograph-medias").innerHTML = articleMedias.join("");

        const popupFactory = new PopupFactory(this.photographerName, this.allMedias);

        const articleMedia = document.querySelectorAll(".photograph-medias__content");
        articleMedia.forEach(article => {
            article.addEventListener("click", () => popupFactory.mediaPopup(article));
            article.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    popupFactory.mediaPopup(article);
                }
            });
        });

        const divAllLikes = this.showAllLikes();
        document.querySelector(".totalLikes").innerHTML = divAllLikes;

        const sortMediasSelect = document.getElementById("filter_medias");
        sortMediasSelect.addEventListener("change", (e) => this.sortMediasBy(e.target.value));

        const allMediasLikes = document.querySelectorAll(".photograph-medias__likes ");
        allMediasLikes.forEach(mediaLike => {
            mediaLike.addEventListener("click", () => this.likeMedia(mediaLike));
        });
    }

    photographerTemplate(photographerData) {
        const { name, portrait, city, country, tagline } = photographerData;

        const photographer_description =
            `<div class="photograph-presentation">
        <h1>${name}</h1>
        <p class="photographer__origin">
            ${city}, ${country}
        </p>
        <p class="photographer__tagline">
            ${tagline}
        </p>
    </div>
    <button class="contact_button">Contactez-moi</button>
    <img src="assets/photographers/${portrait}" alt="${name}">`;

        return photographer_description;
    }

    mediasTemplate(mediasToDisplay) {
        let numberLikes = 0;
        let articleMedias = [];
        let controlVideo = false;

        mediasToDisplay.forEach(media => {
            const { title, likes, id } = media;
            const { baliseMedia, classMedia } = mediaFactory(media, this.photographerName, controlVideo);
            numberLikes = numberLikes + likes;
            const article =
                `<article class="photograph-medias__items">
                <div tabindex="0" aria-label="Ouvrir la popup sur ce média" class="${classMedia} photograph-medias__content" data-id="${id}">${baliseMedia}</div>
                <div class="photograph-medias__description">
                    <p>
                        ${title}
                    </p>
                    <button class="photograph-medias__likes" data-like="false">
                        <span>${likes}</span>
                        <i title="Aimer la photo" class="fa-solid fa-heart"></i>
                    </button>
                </div>
            </article>`;
            articleMedias.push(article);
        });
        return ({ articleMedias, numberLikes });
    }

    showAllLikes() {
        return `<div class="likes">
                <p class="numberLikes">${this.numberLikes}</p>
                <i title="Nombre total de likes de toutes les photos" class="fa-solid fa-heart"></i>
            </div>
            <p class="price">${this.photographerPrice}€/jour</p>`;
    }

    likeMedia(mediaLike) {
        let allLikes = document.querySelector(".numberLikes");
        let mediaLikeChild = mediaLike.childNodes[1];

        if (mediaLike.getAttribute("data-like") === "false") {
            mediaLike.setAttribute("data-like", "true");
            mediaLikeChild.innerHTML = parseInt(mediaLikeChild.innerHTML) + 1;
            allLikes.innerHTML = parseInt(this.numberLikes) + 1;
            this.numberLikes = parseInt(this.numberLikes) + 1;
        } else {
            mediaLike.setAttribute("data-like", "false");
            mediaLikeChild.innerHTML = parseInt(mediaLikeChild.innerHTML) - 1;
            allLikes.innerHTML = parseInt(this.numberLikes) - 1;
            this.numberLikes = parseInt(this.numberLikes) - 1;
        }
    }

    /**
     * @param {"likes" | "date" | "title"} property
     */
    sortMediasBy(property) {
        let originalMedias = [...this.allMedias];

        if (property === "date") {
            originalMedias.forEach(media => {
                media.date = Date.parse(media.date);
            });
        }
        const sortedMedias = originalMedias.sort(this.sortBy(property));
        let { articleMedias, numberLikes } = this.mediasTemplate(sortedMedias);
        document.querySelector(".photograph-medias").innerHTML = articleMedias.join("");

        let allLikes = document.querySelector(".numberLikes");
        allLikes.innerHTML = numberLikes;

        const popupFactory = new PopupFactory(this.photographerName, sortedMedias);

        const articleMedia = document.querySelectorAll(".photograph-medias__content");
        articleMedia.forEach(article => {
            article.addEventListener("click", () => popupFactory.mediaPopup(article));
            article.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    popupFactory.mediaPopup(article);
                }
            });
        });

        const allMediasLikes = document.querySelectorAll(".photograph-medias__likes ");
        allMediasLikes.forEach(mediaLike => {
            mediaLike.addEventListener("click", () => this.likeMedia(mediaLike, this.numberLikes));
        });
    }

    /**
     * @param {"likes" | "date" | "title"} property
     */
    sortBy(property) {
        if (property === "likes") {
            return function (person1, person2) {
                if (person1[property] < person2[property]) {
                    return 1;
                }
                if (person1[property] > person2[property]) {
                    return -1;
                }
                return 0;
            };
        } else {
            return function (person1, person2) {
                if (person1[property] > person2[property]) {
                    return 1;
                }
                if (person1[property] < person2[property]) {
                    return -1;
                }
                return 0;
            };
        }
    }
}


init();
