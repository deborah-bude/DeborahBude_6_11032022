const searchParams = new URLSearchParams(window.location.search);
const photographerId = searchParams.get('id')

async function init() {
    const { photographers } = await getPhotographers();
    const photographerHeader = document.querySelector('.photograph-header');
    let redirection = false;
    photographers.forEach(photographer => {
        if (photographer.id === parseInt(photographerId)) {
            const photographerArticle = photographerTemplate(photographer);
            photographerHeader.innerHTML = photographerArticle;
            redirection = true;
        }
    });
    if (!redirection) {
        location.href = './';
    }
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
    <img src="assets/photographers/${portrait}" alt="${name}">`

    return photographer_description;
}

init()