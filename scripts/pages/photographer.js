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

    const { allMedias, articleMedias, numberLikes } = await mediasTemplate(id, photographerName);
    document.querySelector('.photograph-medias').innerHTML = articleMedias.join('');

    const articleMedia = document.querySelectorAll(".photograph-medias__items ");
    articleMedia.forEach(article => {
        article.addEventListener("click", () => mediaPopup(photographerName, article, allMedias))
    });

    const divAllLikes = showAllLikes(numberLikes, photographerPrice);
    document.querySelector('.totalLikes').innerHTML = divAllLikes;
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

async function mediasTemplate(id, photographerName) {
    const allMedias = await getMediasForPhotographer(id);
    let numberLikes = 0;
    let articleMedias = [];
    let controlVideo = false;

    allMedias.forEach(media => {
        const { title, image, likes, video, id } = media;
        const { baliseMedia, classMedia } = mediaFactory(media, photographerName, controlVideo);
        numberLikes = numberLikes + likes;
        const article =
            `<article class="photograph-medias__items" data-id="${id}">
                <div class="${classMedia} photograph-medias__content">${baliseMedia}</div>
                <div class="photograph-medias__description">
                    <p>
                        ${title}
                    </p>
                    <div class="photograph-medias__likes">
                        ${likes}
                        <i aria-label="Aimer la photo" class="fa-solid fa-heart"></i>
                    </div>
                </div>
            </article>`;
        articleMedias.push(article);
    })
    return ({ allMedias, articleMedias, numberLikes });
}

function mediaPopup(photographerName, article, allMedias) {
    const attribute = parseInt(article.getAttribute("data-id"));
    const mediaIndex = allMedias.findIndex(media => media.id === attribute);
    let controlVideo = true;

    const { baliseMedia } = mediaFactory(allMedias[mediaIndex], photographerName, controlVideo);

    popUpImg = document.querySelector(".popup div");
    popUpImg.parentElement.style.display = "flex";
    document.querySelector("body").style.overflowY = "hidden";
    popUpImg.innerHTML = baliseMedia;

    changeMediaPopup('prev', mediaIndex, allMedias[mediaIndex - 1], photographerName, controlVideo, popUpImg);
    
    changeMediaPopup('next', mediaIndex, allMedias[mediaIndex + 1], photographerName, controlVideo, popUpImg);

    const closePopup = document.querySelector("#close");
    closePopup.addEventListener("click", () => {
        popUpImg.parentElement.style.display = "none";
        document.querySelector("body").style.overflowY = "auto"
    });
}

function changeMediaPopup(direction, mediaIndex, AllMediaIndex, photographerName, controlVideo, popUpImg) {
    let directionMedia;

    if (direction === 'next') {
        directionMedia = document.querySelector("#next");
        newMediaIndex = mediaIndex + 1
    } else {
        directionMedia = document.querySelector("#prev");
        newMediaIndex = mediaIndex - 1
    }

    const newMediaHTML = mediaFactory(AllMediaIndex, photographerName, controlVideo).baliseMedia;
    directionMedia.addEventListener("click", () => newMediaPopup(popUpImg, newMediaHTML, direction, mediaIndex));
}

function newMediaPopup(popUpImg, newMedias, direction, mediaIndex) {
    let newMediaIndex;

    if (direction === 'next') {
        newMediaIndex = mediaIndex + 1
    } else {
        newMediaIndex = mediaIndex - 1
    }

    console.log(newMediaIndex);
    popUpImg.innerHTML = newMedias;
    
    return newMediaIndex;
}

function showAllLikes(totalLikesNumber, price) {
    return `<div class="likes">
                <p>${totalLikesNumber}</p>
                <i aria-label="Nombre total de likes de toutes les photos" class="fa-solid fa-heart"></i>
            </div>
            <p class="price">${price}€/jour</p>`;
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