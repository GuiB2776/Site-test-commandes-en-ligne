// — menuNav.js — 
(function() {
  const nav = document.getElementById('nav');
  nav.innerHTML = `
    <div class="logo">
      <a href="index.html">Sulawesi Fair Trade</a>
    </div>

    <button id="burger" class="burger"
            aria-label="Ouvrir le menu"
            aria-expanded="false"
            aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>

    <ul id="nav-links" class="nav-links">
      <li><a href="index.html">Accueil</a></li>
      <li class="has-dropdown">
        <button class="dropdown-toggle"
                aria-expanded="false">
          Produits
        </button>
        <ul class="dropdown">
          <li><a href="produits.html">Tous les produits</a></li>
          <li><a href="huiles-essentielles.html">Huiles essentielles</a></li>
          <li><a href="cafe.html">Café</a></li>
        </ul>
      </li>
      <li><a href="a-propos.html">À propos</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="cgu-cgv.html">CGU & CGV</a></li>
    </ul>
  `;

  const burger      = document.getElementById('burger');
  const navLinks    = document.getElementById('nav-links');
  const dropdownToggles = navLinks.querySelectorAll('.dropdown-toggle');

  // Ouvre/ferme le menu burger
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', open);
    // Lorsqu'on ferme le menu, on ferme aussi tous les dropdowns
    if (!open) {
      navLinks.querySelectorAll('.has-dropdown.open').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.dropdown-toggle')
            .setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Pour chaque dropdown, gestion du clic
  dropdownToggles.forEach(btn => {
    btn.addEventListener('click', e => {
      const li = btn.parentElement;               // <li class="has-dropdown">
      const isOpen = li.classList.toggle('open'); // ajoute ou enlève .open
      btn.setAttribute('aria-expanded', isOpen);
      e.stopPropagation();                        // ne pas fermer le menu global
    });
  });

  // Fermer dropdown si on clique en dehors (desktop)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      dropdownToggles.forEach(btn => {
        const li = btn.parentElement;
        if (li.classList.contains('open')) {
          li.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
})();

