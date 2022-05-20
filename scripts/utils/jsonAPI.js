async function getPhotographers() {
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

async function getPhotographerById(photographerId) {
    const { photographers } = await getPhotographers()
    const id = parseInt(photographerId);
    return photographers.find(p => p.id === id); 
}

async function getMediasForPhotographer(id) {
    let allMedias;
    return fetch('./data/photographers.json')
    .then(function (response) {
        return response.json();
    })
    .then((object) => {
        allMedias = object.media.filter(media => media.photographerId === id);
        return allMedias;
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });
}