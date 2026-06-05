import { places } from '../data/places.mjs';

const grid = document.querySelector('#discover-grid');
const modal = document.querySelector('#place-modal');
const modalClose = document.querySelector('#modal-close');
const activeIntervals = new Map();

places.forEach((place, index) => {
    const card = document.createElement('article');
    card.classList.add('place-card', `card${index + 1}`);
    card.style.animationDelay = `${index * 0.15}s`;

    card.dataset.index = index;
    const randomImg = place.images[Math.floor(Math.random() * place.images.length)];

    card.innerHTML = `
<h2>${place.name}</h2>
<figure>
<img src="${randomImg}" alt="${place.name}" loading="lazy" width="300" height="200" class="card-img">
</figure>
<address>${place.address}</address>
<p>${place.description}</p>
<button type="button" class="learn-more-btn" data-index="${index}">Learn More</button>
`;

    grid.appendChild(card);

    const img = card.querySelector('.card-img');
    if (index === 0) {
        img.removeAttribute('loading');
        img.setAttribute('fetchpriority', 'high');
    }

    startImageShuffle(card, place.images);
});

function startImageShuffle(cardElement, imagesArray) {
    if (imagesArray.length <= 1) return;

    const figure = cardElement.querySelector('figure');
    let img = cardElement.querySelector('.card-img');
    let currentIndex = imagesArray.indexOf(img.getAttribute('src'));

    const intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % imagesArray.length;
        const nextImg = document.createElement('img');
        nextImg.src = imagesArray[currentIndex];
        nextImg.alt = img.alt;
        nextImg.className = 'card-img next-img';
        nextImg.width = 300;
        nextImg.height = 200;
        nextImg.loading = 'lazy';
        figure.appendChild(nextImg);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                img.classList.add('fade-out');
                nextImg.classList.remove('next-img');
            });
        });

        setTimeout(() => {
            img.remove();
            img = nextImg;
        }, 2500)

    }, 10000);

    activeIntervals.set(cardElement, intervalId);
}

document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const place = places[btn.getAttribute('data-index')];

        document.querySelector('#modal-name').textContent = place.name;
        document.querySelector('#modal-img').src = place.images[0];
        document.querySelector('#modal-img').alt = place.name;
        document.querySelector('#modal-address').textContent = place.address;
        document.querySelector('#modal-hours').textContent = place.hours;
        document.querySelector('#modal-desc').textContent = place.extendedDescription;
        document.querySelector('#modal-link').href = place.website;
        document.querySelector('#modal-link').textContent = place.website;

        const mapContainer = document.querySelector('#modal-map');
        mapContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${place.lng - 0.01},${place.lat - 0.01},${place.lng + 0.01},${place.lat + 0.01}&layer=mapnik&marker=${place.lat},${place.lng}`;
        iframe.width = '100%';
        iframe.height = '250';
        iframe.style.border = 'none';
        iframe.setAttribute('loading', 'lazy');
        iframe.title = `Map of ${place.name}`;
        mapContainer.appendChild(iframe);

        modal.showModal();
    });
});

modalClose.addEventListener('click', () => {
    modal.close();
    document.querySelector('#modal-map').innerHTML = '';
});

const msgEl = document.querySelector('#visitor-msg');
const lastVisit = localStorage.getItem('discoverLastVisit');
const now = Date.now();

if (!lastVisit) {
    msgEl.textContent = 'Welcome! Let us know if you have any questions.';
} else {
    const diff = now - parseInt(lastVisit);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) {
        msgEl.textContent = 'Back so soon! Awesome!';
    } else if (days === 1) {
        msgEl.textContent = 'You last visited 1 day ago.';
    } else {
        msgEl.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem('discoverLastVisit', now);
