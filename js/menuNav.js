// menu.js

// On injecte toute la structure du menu dans #nav
// et on gère l’ouverture/fermeture via JS pour centraliser la logique.
(function() {
  const nav = document.getElementById('nav');

  nav.innerHTML = `
    <div class="logo">Sulawesi Fair Trade</div>
    <button id="burger" class="burger"
            aria-label="Ouvrir le menu"
            aria-expanded="false"
            aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>
    <ul id="nav-links" class="nav-links">
      <li><a href="index.html">Accueil</a></li>
      <li><a href="produits.html">Produits</a></li>
      <li><a href="a-propos.html">À propos</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="cgu-cgv.html">CGU & CGV</a></li>
    </ul>
  `;

  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  burger.addEventListener('click', () => {
    // bascule de l’état du menu
    const isOpen = navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    // mise à jour de l’attribut aria-expanded
    burger.setAttribute('aria-expanded', isOpen);
  });
})();
