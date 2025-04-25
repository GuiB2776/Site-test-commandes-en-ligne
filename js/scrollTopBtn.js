///------------------------------------------------------------------------------///
///--------------------------/// SCROLL TOP BUTTON ///--------------------------///
///----------------------------------------------------------------------------///

// Sélectionne le bouton "Retour en haut"
const scrollToTopButton = document.getElementById("scrollToTop");

// Affiche/masque le bouton en fonction de la position de défilement
window.addEventListener("scroll", () => {
    if (window.scrollY > 30) { // Affiche si l'utilisateur descend de 30px
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
});

// Ajoute un événement au clic pour remonter en haut de la page
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Défilement fluide
    });
});