import { getCities } from './cities.js';

const featuredGrid = document.querySelector('#featured-grid');

function buildCard(city, index) {
    const card = document.createElement('article');
    card.classList.add('city-card');
    card.style.animationDelay = `${index * 0.15}s`;

    const statusClass = city.status.toLowerCase().replace(/\s+/g, '-');

    card.innerHTML = `
<img src="${city.image}" alt="${city.name}" loading="lazy" width="300" height="180">
<div class="city-card-body">
<h3>${city.name}</h3>
<p>${city.civilization} &bull; ${city.region}</p>
<p>${city.year}</p>
<span class="city-tag status-${statusClass}">${city.status}</span>
</div>
`;

    return card;
}

async function loadFeatured() {
    const cities = await getCities();
    if (!cities.length) return;

    const featured = [...cities].sort(() => Math.random() - 0.5).slice(0, 3);

    featured.forEach((city, index) => {
        const card = buildCard(city, index);
        featuredGrid.appendChild(card);
        observeCards();
    });
}

function observeCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.city-card:not(.visible').forEach(card => {
        observer.observe(card);
    });
}

loadFeatured();
