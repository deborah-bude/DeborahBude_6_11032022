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

    const {articleMedias, numberLikes} = await mediasTemplate(id, photographerName);
    document.querySelector('.photograph-medias').innerHTML = articleMedias.join('');

    const divAllLikes = showAllLikes(numberLikes, photographerPrice);
    document.querySelector('.totalLikes').innerHTML = divAllLikes;
};

function photographerTemplate (photographerData) {
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
    
    allMedias.forEach( media => {
        const { title, image, likes, video } = media;
        let baliseMedia;
        let classMedia;
        if (media.image) {
            classMedia = 'image';
            baliseMedia = `<img src="./assets/photos/${photographerName}/${image}" alt="${title}">`
        } else if (media.video) {
            classMedia = 'video';
            baliseMedia = 
            `<video width="320" height="240" id="video">
                <source src="./assets/photos/${photographerName}/${video}" type="video/mp4">
            </video>`;
        }
        numberLikes = numberLikes + likes;
        const article = 
        `<article class="photograph-medias__items">
            <a class="${classMedia}" href="#">${baliseMedia}</a>
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
    return ({articleMedias, numberLikes});
}

function showAllLikes(totalLikesNumber, price) {
    return `<div class="likes">
                <p>${totalLikesNumber}</p>
                <i aria-label="Nombre total de likes de toutes les photos" class="fa-solid fa-heart"></i>
            </div>
            <p class="price">${price}€/jour</p>`;
}

init()