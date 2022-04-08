async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    const articles = []

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        articles.push(userCardDOM);
    });

    photographersSection.innerHTML = articles.join('');
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
