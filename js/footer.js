window.addEventListener('DOMContentLoaded', function() 
{
    // Changer les textes et liens du footer
    document.getElementById('site-name').textContent = "CV Intrade Konsultindo";
    document.getElementById('copyright-link').href = "https://www.linkedin.com/in/charles-gabriel-bullet-b02a239a/";
    document.getElementById('copyright').textContent = new Date().getFullYear();
    document.getElementById('copyright-text').textContent = "| Tous droits réservés.";
    document.getElementById('cgu-link').href = "CGU.html";
    document.getElementById('cgu-text').textContent = "Conditions Générales d'Utilisation";
    document.getElementById('rgpd-link').href = "RGPD.html";
    document.getElementById('rgpd-text').textContent = "Politique de Confidentialité (RGPD)";
    document.getElementById('siteManager-link').href = "https://www.linkedin.com/in/guillaumebullet/";
    document.getElementById('siteManager-text').textContent = "Guillaume BULLET";
});

