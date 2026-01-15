const PRIVATE_COLLECTION= "(Collezione privata)"
async function loadArtworks() {
    try {
        const response = await fetch('./data/data.json');
        const artworks = await response.json();
        const grid = document.getElementById('artwork-grid');

        artworks.forEach(artwork => {
            // Crea un wrapper per ogni immagine
            const item = document.createElement('div');
            item.className = 'grid-item';

            const img = document.createElement('img');
            img.src = artwork.url;
            img.alt = artwork.title;
            img.loading = 'lazy';
            img.style.cursor = 'pointer';

            // Click per aprire il modal
            img.addEventListener('click', () => openModal(artwork));

            const title = document.createElement('h3');
            title.className = 'artwork-title';
            title.textContent = artwork.title;

            item.appendChild(img);
            item.appendChild(title);
            grid.appendChild(item);
        });
        createModal();

    } catch (error) {
        console.error('Errore nel caricamento delle immagini:', error);
    }
}

function createModal() {
    const modal = document.createElement('div');
    modal.id = 'artwork-modal';
    modal.className = 'modal';

    modal.innerHTML = `
        <span class="modal-close">&times;</span>
        <img class="modal-content" id="modal-img" alt="">
        <div class="modal-caption">
            <h2 class="modal-title title-header letter-spacing"></h2>
            <p class="private-collection"></p>
            <p class="modal-description"></p>
            <p class="art-description text-start"></p> 
            <div class="d-flex justify-content-between text-start">
                <p class= "artwork-size"></p>
                <p class="modal-date"></p>
            </div>
        
        </div>
    `;

    document.body.appendChild(modal);

    // Chiudi cliccando sulla X
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);

    // Chiudi cliccando fuori dall'immagine
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Chiudi con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(artwork) {
    const modal = document.getElementById('artwork-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementsByClassName('modal-title').item(0);
    const modalDescription = document.getElementsByClassName('modal-description').item(0);
    const modalDate = document.getElementsByClassName('modal-date').item(0);
    const artDescription = document.getElementsByClassName('art-description').item(0);
    const artSize = document.getElementsByClassName('artwork-size').item(0);
    const privateCollection = document.getElementsByClassName('private-collection').item(0);

    modal.style.display = 'block';
    modalImg.src = artwork.url;
    modalImg.alt = artwork.title;
    modalTitle.textContent = artwork.title;
    modalDescription.textContent = artwork.description;

    if (artwork.createDate) {
        modalDate.textContent = artwork.createDate;
    }
    if (artwork.technique) {
        artDescription.textContent = artwork.technique;
    }
    if (artwork.size) {
        artSize.textContent = artwork.size;
    }
    if (artwork.privateCollection !== null && artwork.privateCollection === true) {
        privateCollection.textContent = PRIVATE_COLLECTION;
    }

    // Previeni lo scroll del body
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

}

function closeModal() {
    const modal = document.getElementById('artwork-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');

}


document.addEventListener('DOMContentLoaded', loadArtworks);

