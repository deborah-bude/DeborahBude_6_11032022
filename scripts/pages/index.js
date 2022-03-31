async function getPhotographers() {
    let photographers;
    return fetch('./data/photographers.json')
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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    const articles = []

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel;
        articles.push(userCardDOM);
    });

    photographersSection.innerHTML = articles.join('')
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
