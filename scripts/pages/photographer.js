//Mettre le code JavaScript lié à la page photographer.html
const searchParams = new URLSearchParams(window.location.href);
const photographerId = searchParams.get('id')
console.log(photographerId);

