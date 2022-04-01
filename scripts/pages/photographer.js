const searchParams = new URLSearchParams(window.location.search);
const photographerId = searchParams.get('id');

async function init() {
    const { photographers } = await getPhotographers();
    const photographerHeader = document.querySelector('.photograph-header');
    let redirection = false;
    const id = parseInt(photographerId);
    let photographerName;
    let photographerPrice;

    photographers.forEach(photographer => {
        if (photographer.id === id) {
            redirection = true;
            photographerName = photographer.name;
            photographerPrice = photographer.price;
            const photographerArticle = photographerTemplate(photographer);
            photographerHeader.innerHTML = photographerArticle;

            const {articleMedias, numberLikes} = mediasTemplate(id, photographer.name);
        }
    });

    if (!redirection) {
        location.href = './';
    }

    const {articleMedias, numberLikes} = await mediasTemplate(id, photographerName);
    document.querySelector('.photograph-medias').innerHTML = articleMedias.join('');

    const divAllLikes = await showAllLikes(numberLikes, photographerPrice);
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
    const allMedias = await getMedias();
    let numberLikes = 0;
    let photographMedias = [];
    let articleMedias = [];
    allMedias.forEach(media => {
        if (media.photographerId === id) {
            photographMedias.push(media)
        }
    });
    
    photographMedias.forEach( media => {
        const { title, image, likes, video } = media;
        let baliseMedia;
        let classMedia;
        if (media.image) {
            pathMedia = `./assets/photos/${photographerName}/${image}`;
            classMedia = 'image';
            baliseMedia = `<img src="${pathMedia}" alt="${title}">`
        } else if (media.video) {
            pathMedia = `./assets/photos/${photographerName}/${video}`;
            classMedia = 'video';
            baliseMedia = 
            `<video width="320" height="240" id="video">
                <source src="${pathMedia}" type="video/mp4">
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

async function showAllLikes(totalLikesNumber, price) {
    return `<div>
                <p>${totalLikesNumber}</p>
                <i aria-label="Nombre total de likes de toutes les photos" class="fa-solid fa-heart"></i>
            </div>
            <p>${price}€/jour</p>`;
}

init()