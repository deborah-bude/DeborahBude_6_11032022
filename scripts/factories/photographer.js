export function photographerFactory(data) {
	const { id, name, portrait, city, country, tagline, price } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const photographer = `<article>
                            <a href="./photographer.html?id=${id}">
                                <img src="${picture}" alt="${name}">
                                <h2>${name}</h2>
                            </a>
                            <p class="photographer__origin">
                                ${city}, ${country}
                            </p>
                            <p class="photographer__tagline">
                                ${tagline}
                            </p>
                            <p class="photographer__price">
                                ${price}€/jour
                            </p>
                        </article>`;
		return photographer;
	}
    
	return { id, name, portrait, city, country, tagline, price, getUserCardDOM };
}
