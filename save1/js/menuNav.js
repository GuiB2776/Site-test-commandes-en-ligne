(function() {
  const nav = document.getElementById('nav');
  nav.innerHTML = `

    <div class="logo">
      <a href="index.html">Soulawesi Essential Oil</a>
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
          <!--------------- 2ᵉ niveau - HUILES ESSENTIELLES --------------->
          <li class="has-dropdown">
            <button class="dropdown-toggle" …>Huiles essentielles</button>
            <ul class="dropdown">
              <!-- 3ᵉ niveau : sous-menu "Toutes nos Huiles" -->
              <li class="has-dropdown">
                <button class="dropdown-toggle dropdown-toggle-3" …>Toutes nos Huiles</button>
                <ul class="dropdown">
                  <li><a href="#">Toutes nos Huiles Essentielles</a></li>
                  <li><a href="#">Huile Essentielle 1</a></li>
                  <li><a href="#">Huile Essentielle 2</a></li>
                  <li><a href="#">Huile Essentielle 3</a></li>
                  <li><a href="#">Huile Essentielle 4</a></li>
                </ul>
              </li>
              <!-- 2ᵉ niveau : liens directs -->
              <li><a href="patchouli.html">Patchouli</a></li>
              <li><a href="test.html">Lemongrass</a></li>
            </ul>
          </li>
          <!--------------- 2ᵉ niveau - MIXTURE --------------->
          <li class="has-dropdown">
            <button class="dropdown-toggle" aria-expanded="false">
              Mixtures
            </button>
            <ul class="dropdown">
              <!--------------- 3ᵉ niveau --------------->
                <li><a href="#">Toutes nos Mixtures</a></li>
                <li><a href="#">Mixture 1</a></li>
                <li><a href="#">Mixture 2</a></li>
                <li><a href="#">Mixture 3</a></li>
                <li><a href="#">Mixture 4</a></li>
            </ul>
          </li>
        </ul>
      </li>

      <li><a href="#">À propos</a></li>

      <li><a href="contact.html">Contact</a></li>

      <li><a href="cgu-cgv.html">CGU & CGV</a></li>

      <!--------------- 2ᵉ niveau - LANGUES --------------->
      <li class="has-dropdown">
        <button class="dropdown-toggle" aria-expanded="false">
          🇫🇷 🇺🇸 🇮🇩
        </button>
        <ul class="dropdown">
          <!--------------- 3ᵉ niveau --------------->
            <li><a href="#">🇫🇷</a></li>
            <li><a href="#">🇺🇸</a></li>
            <li><a href="#">🇮🇩</a></li>
        </ul>
      </li>

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
  navLinks.querySelectorAll('.dropdown-toggle')
  .forEach(btn => {
    btn.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const li = btn.closest('.has-dropdown');
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

