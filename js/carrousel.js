// carrouselPartenaires.js
document.addEventListener('DOMContentLoaded', () => {
  const piste        = document.querySelector('.carrousel-piste');
  const items        = Array.from(piste.children);
  const origCount    = items.length;
  const btnPrec      = document.querySelector('.carrousel-btn.precedent');
  const btnSuiv      = document.querySelector('.carrousel-btn.suivant');
  let indexActuel    = 0;
  let largeurItem;

  // 1) Dupliquer les items pour le looping infini
  items.forEach(item => piste.appendChild(item.cloneNode(true)));

  // calculer largeur (item + margins)
  const calculeLargeur = () => {
    const style = getComputedStyle(piste.children[0]);
    largeurItem = piste.children[0].getBoundingClientRect().width
                + parseFloat(style.marginLeft)
                + parseFloat(style.marginRight);
  };

  // positionner chaque élément horizontalement
  const positionneItems = () => {
    calculeLargeur();
    Array.from(piste.children).forEach((item, i) => {
      item.style.left = `${largeurItem * i}px`;
    });
  };

  // déplacer la piste à l’index donné, avec transition
  const deplaceVers = idx => {
    piste.style.transition = 'transform 0.5s ease';
    piste.style.transform  = `translateX(-${largeurItem * idx}px)`;
    indexActuel = idx;
  };

  // Au terme de la transition, si on est sur une copie, on reset sans transition
  piste.addEventListener('transitionend', () => {
    if (indexActuel >= origCount) {
      // on est sur un clone du début → on saute au vrai début
      piste.style.transition = 'none';
      indexActuel = 0;
      piste.style.transform  = 'translateX(0)';
    } else if (indexActuel < 0) {
      // cas “précédent” depuis le début (optionnel)
      piste.style.transition = 'none';
      indexActuel = origCount - 1;
      piste.style.transform  = `translateX(-${largeurItem * indexActuel}px)`;
    }
  });

  // Fonctions suivant / précédent
  const suivant = () => deplaceVers(indexActuel + 1);
  const precedent = () => deplaceVers(indexActuel - 1);

  btnSuiv.addEventListener('click', suivant);
  btnPrec.addEventListener('click', precedent);

  // Autoplay continu toutes les 4s
  let autoPlay = setInterval(suivant, 2000);

  // pause au survol
  const container = document.querySelector('.carrousel-container');
  container.addEventListener('mouseover', () => clearInterval(autoPlay));
  container.addEventListener('mouseout', ()  => autoPlay = setInterval(suivant, 4000));

  // recalcule si on redimensionne
  window.addEventListener('resize', () => {
    positionneItems();
    // reposition dans le flux (utile après un reset)
    piste.style.transition = 'none';
    piste.style.transform  = `translateX(-${largeurItem * indexActuel}px)`;
  });

  // init
  positionneItems();
});
