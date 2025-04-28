// carrouselTemoignages.js
document.addEventListener('DOMContentLoaded', () => {
    const piste       = document.querySelector('.temoignages__piste');
    const items       = Array.from(piste.children);
    const btnPrec     = document.querySelector('.temoignages__btn.precedent');
    const btnSuiv     = document.querySelector('.temoignages__btn.suivant');
    const totalOrig   = items.length;
    let indexActuel   = 0;
    let largeurItem;
  
    // 1. Duplique pour boucle infinie
    items.forEach(item => piste.appendChild(item.cloneNode(true)));
  
    // Calcule la largeur (100% du container)
    const calculeLargeur = () => {
      largeurItem = piste.parentElement.getBoundingClientRect().width;
    };
  
    // Positionne chaque item en absolute via left
    const positionneItems = () => {
      calculeLargeur();
      Array.from(piste.children).forEach((item, i) => {
        item.style.left = `${largeurItem * i}px`;
      });
    };
  
    // Déplace la piste à l’index donné
    const deplaceVers = idx => {
      piste.style.transition = 'transform 0.5s ease';
      piste.style.transform  = `translateX(-${largeurItem * idx}px)`;
      indexActuel = idx;
    };
  
    // Quand la transition termine, reset si nécessaire
    piste.addEventListener('transitionend', () => {
      if (indexActuel >= totalOrig) {
        piste.style.transition = 'none';
        indexActuel = 0;
        piste.style.transform  = 'translateX(0)';
      } else if (indexActuel < 0) {
        piste.style.transition = 'none';
        indexActuel = totalOrig - 1;
        piste.style.transform  = `translateX(-${largeurItem * indexActuel}px)`;
      }
    });
  
    // Fonctions suivant et précédent
    const suivant  = () => deplaceVers(indexActuel + 1);
    const precedent = () => deplaceVers(indexActuel - 1);
  
    btnSuiv.addEventListener('click', suivant);
    btnPrec.addEventListener('click', precedent);
  
    // Autoplay toutes les 5 secondes
    let autoPlay = setInterval(suivant, 5000);
    const conteneur = document.querySelector('.temoignages__container');
    conteneur.addEventListener('mouseover', () => clearInterval(autoPlay));
    conteneur.addEventListener('mouseout',  () => autoPlay = setInterval(suivant, 5000));
  
    // Recalcule au redimensionnement
    window.addEventListener('resize', () => {
      positionneItems();
      piste.style.transition = 'none';
      piste.style.transform  = `translateX(-${largeurItem * indexActuel}px)`;
    });
  
    // Lancement
    positionneItems();
  });
  