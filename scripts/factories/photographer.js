function photographerFactory(data) {
    console.log(data)
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographersSection = document.querySelector(".photographer_section");
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.href = `/photographer.html?q=URLUtils.searchParams&id=${id}`

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const origin = document.createElement( 'p' );
        origin.textContent = `${city}, ${country}`;
        origin.classList.add("photographer__origin") 

        const tagLine = document.createElement( 'p' );
        tagLine.textContent = tagline;
        tagLine.classList.add("photographer__tagline") 

        const tagprice = document.createElement( 'p' );
        tagprice.textContent = `${price}€/jour`;
        tagprice.classList.add("photographer__price")

        photographersSection.appendChild(article);
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(origin);
        article.appendChild(tagLine);
        article.appendChild(tagprice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}