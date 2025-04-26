(function() {
  const nav = document.getElementById('nav');
  nav.innerHTML = `

    <div class="logo">
      <a href="index.html">Soulawesi Biological Oil</a>
    </div>

    <button id="burger" class="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>

    <ul id="nav-links" class="nav-links">

      <li><a href="index.html">Accueil</a></li>
      
      <!--------------- 1ᵉ niveau --------------->
      <li class="has-dropdown">
        <button class="dropdown-toggle" aria-expanded="false">
          Produits
        </button>
        <ul class="dropdown">
          <li><a href="produits.html">Tous nos produits</a></li>

          <!--------------- 2ᵉ niveau --------------->
          <li class="has-dropdown">
            <button class="dropdown-toggle" aria-expanded="false">
              Huiles essentielles
            </button>
            <ul class="dropdown">
              
              <!--------------- 3ᵉ niveau --------------->
              <li class="has-dropdown">
                <button class="dropdown-toggle dropdown-toggle-3" aria-expanded="false">
                  Citrus
                </button>
                <ul class="dropdown">
                  <li><a href="orange.html">Orange douce</a></li>
                  <li><a href="citron.html">Citron</a></li>
                </ul>
              </li>
              
              <li><a href="menthe.html">Menthe poivrée</a></li>
              <li><a href="lavande.html">Lavande</a></li>
            </ul>
          </li>

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
  navLinks.querySelectorAll('.has-dropdown')
    .forEach(li => {
      li.addEventListener('click', e => {
        // ne se déclenche que si mobile
        if (window.innerWidth <= 768) {
          // empêcher le lien par défaut et la bulle d'événement
          e.preventDefault();
          e.stopPropagation();
          // même logique que pour le bouton
          const btn = li.querySelector('.dropdown-toggle');
          const isOpen = li.classList.toggle('open');
          btn.setAttribute('aria-expanded', isOpen);
        }
      });
    });

  // Fermer dropdown si on clique en dehors
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

