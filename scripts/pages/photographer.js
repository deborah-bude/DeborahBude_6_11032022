const searchParams = new URLSearchParams(window.location.href);
const photographerId = searchParams.get('id')
console.log(photographerId);

async function getPhotographers() {
    let photographers;
    return fetch('../data/photographers.json')
    .then(function (response) {
        return response.json()
    })
    .then((object) => {
        return ({
            photographers: object.photographers
        })
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    photographers.forEach(photographer => {
        if (photographer.id === parseInt(photographerId)) {
            photographerTemplate(photographer)
        }
    });
};

function photographerTemplate (photographerData) {
    const { name, portrait, city, country, tagline } = photographerData;
    const photographPresentation = document.querySelector('.photograph-presentation');
    const photographHeader = document.querySelector('.photograph-header');
    /* Ajout élément présentation photographe */
    console.log(photographerData);

    const h1 = document.createElement( 'h1' );
    h1.textContent = name;

    const origin = document.createElement( 'p' );
    origin.textContent = `${city}, ${country}`;
    origin.classList.add("photographer__origin") 

    const tagLine = document.createElement( 'p' );
    tagLine.textContent = tagline;
    tagLine.classList.add("photographer__tagline") 
    photographPresentation.appendChild(tagLine);

    photographPresentation.appendChild(h1);
    photographPresentation.appendChild(origin);
    photographPresentation.appendChild(tagLine);

    /* Ajout photo de profil */
    const picture = `assets/photographers/${portrait}`;
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture)
    img.setAttribute("alt", picture)
    photographHeader.appendChild(img);
}

init()