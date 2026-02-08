// Initialisation des dropdowns pour toutes les pages
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que Bootstrap soit chargé
    setTimeout(function() {
        // Initialiser tous les dropdowns avec la classe hide
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(function(menu) {
            menu.classList.add('hide');
        });
        
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(function(toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        });
        
        console.log('Dropdowns initialisés avec la classe hide');
    }, 100);
});
