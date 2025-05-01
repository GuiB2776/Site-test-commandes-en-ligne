// productAccordion.js
document.addEventListener('DOMContentLoaded', () => {
    const tabs     = document.querySelectorAll('.product-accordion__tab');
    const contents = document.querySelectorAll('.product-accordion__content');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // désactive tous
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
  
        // active les bons
        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
      });
    });
  });
  