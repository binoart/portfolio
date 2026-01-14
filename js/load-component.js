async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Errore nel caricamento di ${filePath}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('header-placeholder', './components/header.html');
    await loadComponent('footer-placeholder', './components/footer.html');
    const burgerMenuScript = document.createElement('script');
    burgerMenuScript.src = '/js/burger-menu.js';
    burgerMenuScript.type = 'module';
    document.body.appendChild(burgerMenuScript);


});
