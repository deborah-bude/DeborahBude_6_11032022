function photographerFactory(data) {
    console.log(data)
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const link = document.createElement( 'a' );
        link.href = `./?id=${id}`
        console.log(link.href);
        const article = document.createElement( 'article' );
        link.appendChild(article);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
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
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(origin);
        article.appendChild(tagLine);
        article.appendChild(tagprice);
        return (link);
    }
    return { name, picture, getUserCardDOM }
}