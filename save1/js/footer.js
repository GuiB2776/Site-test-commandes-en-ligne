window.addEventListener('DOMContentLoaded', function() 
{
    // Changer les textes et liens du footer
    document.getElementById('site-name').textContent = "CV Intrade Konsultindo";
    document.getElementById('copyright').textContent = new Date().getFullYear();
    document.getElementById('cgu-link').href = "CGU.html";
    document.getElementById('rgpd-link').href = "RGPD.html";
});

