export function mediaFactory(media, photographerName, controls) {
    let classMedia;
    let baliseMedia;
    const photographerMediasFolder = photographerName.toLowerCase().replace(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (media.image) {
        classMedia = "image";
        baliseMedia = `<img loading="lazy" src="./assets/photos/${photographerMediasFolder}/${media.image}" alt="${media.title}">`;
    } else if (media.video) {
        classMedia = "video";
        if (controls === true) {
            baliseMedia =
                `<video controls>
                <title>${media.title}</title>
                <source src="./assets/photos/${photographerMediasFolder}/${media.video}" type="video/mp4">
            </video>`;
        } else {
            baliseMedia =
                `<video>
                <title>${media.title}</title>
                <source src="./assets/photos/${photographerMediasFolder}/${media.video}" type="video/mp4">
            </video>`;
        }
    }

    return {classMedia, baliseMedia};
}
