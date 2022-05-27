class PopupFactory {

    constructor(photographerName, allMedias) {
        this.photographerName = photographerName;
        this.allMedias = allMedias
    }

    mediaPopup(article) {
        const attribute = parseInt(article.getAttribute("data-id"));
        const mediaIndex = this.allMedias.findIndex(media => media.id === attribute);
        let controlVideo = true;

        const { baliseMedia } = mediaFactory(this.allMedias[mediaIndex], this.photographerName, controlVideo);

        this.popUpImg = document.querySelector(".popup div");
        this.popUpImg.parentElement.style.display = "flex";
        document.querySelector("body").style.overflowY = "hidden";
        this.popUpImg.innerHTML = baliseMedia;

        this.changeMediaPopup(mediaIndex);

        const closePopup = document.querySelector("#close");
        closePopup.addEventListener("click", () => {
            this.popUpImg.parentElement.style.display = "none";
            document.querySelector("body").style.overflowY = "auto"
        });
        closePopup.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.popUpImg.parentElement.style.display = "none";
                document.querySelector("body").style.overflowY = "auto"
            }
        })

        // add all the elements inside modal which you want to make focusable
        const focusableElements =
            'i, [tabindex]:not([tabindex="-1"])';
        const modal = document.querySelector('.popup');
        focusElement(focusableElements, modal);
    }

    changeMediaPopup(originalMediaIndex) {
        let newMediaIndex = originalMediaIndex;

        document.querySelector("#prev").addEventListener("click", () => {
            const newMedia = this.allMedias[newMediaIndex - 1] ?? this.allMedias[this.allMedias.length - 1]
            const newMediaHTML = mediaFactory(newMedia, this.photographerName, true).baliseMedia;
            newMediaIndex = newMediaIndex > 0 ? newMediaIndex - 1 : this.allMedias.length - 1

            this.popUpImg.innerHTML = newMediaHTML;
        });
        document.querySelector("#prev").addEventListener("keyup", (e) => {
            if (e.key === 'Enter') {
                const newMedia = this.allMedias[newMediaIndex - 1] ?? this.allMedias[this.allMedias.length - 1]
                const newMediaHTML = mediaFactory(newMedia, this.photographerName, true).baliseMedia;
                newMediaIndex = newMediaIndex > 0 ? newMediaIndex - 1 : this.allMedias.length - 1

                this.popUpImg.innerHTML = newMediaHTML;
            }
        })

        document.querySelector("#next").addEventListener("click", () => {
            const newMedia = this.allMedias[newMediaIndex + 1] ?? this.allMedias[0]
            const newMediaHTML = mediaFactory(newMedia, this.photographerName, true).baliseMedia;
            newMediaIndex = newMediaIndex === this.allMedias.length - 1 ? 0 : newMediaIndex + 1

            this.popUpImg.innerHTML = newMediaHTML;
        });
        document.querySelector("#next").addEventListener("keyup", (e) => {
            if (e.key === 'Enter') {
                const newMedia = this.allMedias[newMediaIndex + 1] ?? this.allMedias[0]
                const newMediaHTML = mediaFactory(newMedia, this.photographerName, true).baliseMedia;
                newMediaIndex = newMediaIndex === this.allMedias.length - 1 ? 0 : newMediaIndex + 1

                this.popUpImg.innerHTML = newMediaHTML;
            }
        })
    }
}