const searchParams = new URLSearchParams(window.location.search);
const photographerId = searchParams.get('id');

async function init() {
    const { photographers } = await getPhotographers();
    const photographerHeader = document.querySelector('.photograph-header');
    const id = parseInt(photographerId);

    const photographer = photographers.find(p => p.id === id);

    if (!photographer) {
        return location.href = './';
    }

    const photographerName = photographer.name;
    const photographerPrice = photographer.price;
    const photographerArticle = photographerTemplate(photographer);
    photographerHeader.innerHTML = photographerArticle;

    const allMedias = await getMediasForPhotographer(id);
    let { articleMedias, numberLikes } = await mediasTemplate(allMedias, photographerName);
    document.querySelector('.photograph-medias').innerHTML = articleMedias.join('');

    const popupFactory = new PopupFactory(photographerName, allMedias)

    const articleMedia = document.querySelectorAll(".photograph-medias__content");
    articleMedia.forEach(article => {
        article.addEventListener("click", () => popupFactory.mediaPopup(article))
    });

    const divAllLikes = showAllLikes(numberLikes, photographerPrice);
    document.querySelector('.totalLikes').innerHTML = divAllLikes;

    const filterMedias = document.getElementById("filter_medias");
    filterMedias.addEventListener('input', () => filterMediaby(allMedias, filterMedias.value, photographerName));

    const allMediasLikes = document.querySelectorAll(".photograph-medias__likes ");
    allMediasLikes.forEach(mediaLike => {
        mediaLike.addEventListener("click", () => likeMedia(mediaLike, numberLikes))
    });
};

function photographerTemplate(photographerData) {
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
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <img src="assets/photographers/${portrait}" alt="${name}">`;

    return photographer_description;
}

function mediasTemplate(allMedias, photographerName) {
    let numberLikes = 0;
    let articleMedias = [];
    let controlVideo = false;

    allMedias.forEach(media => {
        const { title, image, likes, video, id } = media;
        const { baliseMedia, classMedia } = mediaFactory(media, photographerName, controlVideo);
        numberLikes = numberLikes + likes;
        const article =
            `<article class="photograph-medias__items">
                <div class="${classMedia} photograph-medias__content" data-id="${id}">${baliseMedia}</div>
                <div class="photograph-medias__description">
                    <p>
                        ${title}
                    </p>
                    <div class="photograph-medias__likes" data-like="false">
                        <p>${likes}</p>
                        <i aria-label="Aimer la photo" class="fa-solid fa-heart"></i>
                    </div>
                </div>
            </article>`;
        articleMedias.push(article);
    })
    return ({ articleMedias, numberLikes });
}

function showAllLikes(totalLikesNumber, price) {
    return `<div class="likes">
                <p class="numberLikes">${totalLikesNumber}</p>
                <i aria-label="Nombre total de likes de toutes les photos" class="fa-solid fa-heart"></i>
            </div>
            <p class="price">${price}€/jour</p>`;
}

function likeMedia(mediaLike, numberLikes) {
    let allLikes = document.querySelector(".numberLikes");
    let mediaLikeChild = mediaLike.childNodes[1];

    if (mediaLike.getAttribute('data-like') === "false") {
        mediaLike.setAttribute('data-like', "true");
        mediaLikeChild.innerHTML = parseInt(mediaLikeChild.innerHTML) + 1;
        allLikes.innerHTML = parseInt(numberLikes) + 1;
        numberLikes = parseInt(numberLikes) + 1
    } else {
        mediaLike.setAttribute('data-like', "false");
        mediaLikeChild.innerHTML = parseInt(mediaLikeChild.innerHTML) - 1;
        allLikes.innerHTML = parseInt(numberLikes) - 1;
        numberLikes = parseInt(numberLikes) - 1
    }
}

function filterMediaby(filterMedias, inputValue, photographerName) {
    if (inputValue === "date") {
        filterMedias.forEach(media => {
            media.date = Date.parse(media.date);
        });
    }
    const mediaByName = [...filterMedias].sort(sortBy(`${inputValue}`));
    let { articleMedias, numberLikes } = mediasTemplate(mediaByName, photographerName);
    document.querySelector('.photograph-medias').innerHTML = articleMedias.join('');
    let allLikes = document.querySelector(".numberLikes");
    allLikes.innerHTML = numberLikes;

    const popupFactory = new PopupFactory(photographerName, mediaByName);

    const articleMedia = document.querySelectorAll(".photograph-medias__content");
    articleMedia.forEach(article => {
        article.addEventListener("click", () => popupFactory.mediaPopup(article))
    });

    const allMediasLikes = document.querySelectorAll(".photograph-medias__likes ");
    allMediasLikes.forEach(mediaLike => {
        mediaLike.addEventListener("click", () => likeMedia(mediaLike, numberLikes))
    });
}

function sortBy(inputValue) {
    return function (person1, person2) {
        if (person1[inputValue] > person2[inputValue]) {
            return 1
        }
        if (person1[inputValue] < person2[inputValue]) {
            return -1
        }
        return 0
    }
}

function mediaFactory(media, photographerName, controls) {
    let classMedia;
    let baliseMedia;

    if (media.image) {
        classMedia = 'image';
        baliseMedia = `<img loading="lazy" src="./assets/photos/${photographerName}/${media.image}" alt="${media.title}">`
    } else if (media.video) {
        classMedia = 'video';
        if (controls === true) {
            baliseMedia =
                `<video width="100%" height="240" controls>
                <title>${media.title}</title>
                <source src="./assets/photos/${photographerName}/${media.video}" type="video/mp4">
            </video>`;
        }
        else {
            baliseMedia =
                `<video width="100%" height="240">
                    <title>${media.title}</title>
                    <source src="./assets/photos/${photographerName}/${media.video}" type="video/mp4">
                </video>`;
        }
    }

    return { classMedia, baliseMedia };
}

init()