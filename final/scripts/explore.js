import { getCities } from './cities.js';

const citiesGrid = document.querySelector('#cities-grid');
const resultsCount = document.querySelector('#results-count');
const modal = document.querySelector('#city-modal');
const modalClose = document.querySelector('#modal-close');
const regionSelect = document.querySelector('#region-select');
const eraSelect = document.querySelector('#era-select');
const statusSelect = document.querySelector('#status-select');
const filterBtns = document.querySelectorAll('.filter-btn');

let allCities = [];

function buildCard(city, index) {
    const card = document.createElement('article');
    card.classList.add('city-card');
    card.style.animationDelay = `${index * 0.08}s`;

    const statusClass = city.status.toLowerCase().replace(/\s+/g, '-');

    card.innerHTML = `
<img src="${city.image}" alt="${city.name}" loading="${index < 4 ? 'eager' : 'lazy'}" width="300" height="180">
<div class="city-card-body">
<h3>${city.name}</h3>
<p>${city.civilization} &bull; ${city.region}</p>
<p>${city.year}</p>
<span class="city-tag status-${statusClass}">${city.status}</span>
</div>
`;

    card.addEventListener('click', () => openModal(city));
    return card;
}

function displayCities(cities) {
    citiesGrid.innerHTML = '';
    cities.forEach((city, index) => {
        citiesGrid.appendChild(buildCard(city, index));
    });
    resultsCount.textContent = `${cities.length} ${cities.length === 1 ? 'city' : 'cities'} found`;
    observeCards();
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
    //reveals.forEach(el => observer.observer(el));

function filterAndDisplay() {
    const region = regionSelect.value;
    const era = eraSelect.value;
    const status = statusSelect.value;

    localStorage.setItem('atlas-region', region);
    localStorage.setItem('atlas-era', era);
    localStorage.setItem('atlas-status', status);

    const filtered = allCities.filter(city => {
        const matchRegion = region === 'all' || city.region === region;
        const matchEra = era === 'all' || city.era === era;
        const matchStatus = status === 'all' || city.status === status;
        return matchRegion && matchEra && matchStatus;
    });

    displayCities(filtered);
}

async function openModal(city) {
    document.querySelector('#modal-name').textContent = city.name;
    document.querySelector('#modal-img').src = city.image;
    document.querySelector('#modal-img').alt = city.name;
    document.querySelector('#modal-civilization').textContent = city.civilization;
    document.querySelector('#modal-region').textContent = city.region;
    document.querySelector('#modal-year').textContent = city.year;
    document.querySelector('#modal-status').textContent = city.status;
    document.querySelector('#modal-desc').textContent = city.description;
    document.querySelector('#modal-country-info').innerHTML = '';
    document.querySelector('#modal-artifact').style.display = 'none';

    const mapContainer = document.querySelector('#modal-map');
    mapContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${city.lng - 0.5},${city.lat - 0.5},${city.lng + 0.5},${city.lat + 0.5}&layer=mapnik&marker=${city.lat},${city.lng}`;
    iframe.width = '100%';
    iframe.height = '220';
    iframe.style.border = 'none';
    iframe.title = `Map of ${city.name}`;
    iframe.setAttribute('loading', 'lazy');
    mapContainer.appendChild(iframe);

    modal.showModal();


    // Wikipedia API
    try {
        const wikiName = city.name.replace(/\s+/g, '_');
        const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiName}`);
        const wikiData = await wikiResponse.json();
        if (wikiData.extract) {
            document.querySelector('#modal-desc').textContent = wikiData.extract;
        }
    } catch (error) {
        console.error('Wikipedia fetch failed:', error);
    }

    // REST Countries API
    try {
        const countryName = city.country.split('/')[0].trim();
        if (countryName !== 'Unknown') {
            const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name,flags,population,capital`);
            const countryData = await countryResponse.json();
            if (countryData && countryData[0]) {
                const c = countryData[0];
                const capital = c.capital ? c.capital[0] : 'N/A';
                document.querySelector('#modal-country-info').innerHTML = `
<div class="country-card">
<img src="${c.flags.svg}" alt="Flag of ${c.name.common}" width="28" height="18" loading="lazy">
<span><strong>${c.name.common}</strong></span>
<span>Capital: ${capital}</span>
<span>Population: ${c.population.toLocaleString()}</span>
</div>
`;
            }
        }
    } catch (error) {
        console.error('REST Countries fetch failed:', error);
    }

    // Metropolitan Museum of Art API
    try {
        const searchResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(city.civilization)}&hasImages=true`);
        const searchData = await searchResponse.json();
        if (searchData.objectIDs && searchData.objectIDs.length > 0) {
            const randomId = searchData.objectIDs[Math.floor(Math.random() * Math.min(5, searchData.objectIDs.length))];
            const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`);
            const objectData = await objectResponse.json();
            if (objectData.primaryImageSmall) {
                document.querySelector('#artifact-img').src = objectData.primaryImageSmall;
                document.querySelector('#artifact-img').alt = objectData.title;
                document.querySelector('#artifact-title').textContent = 'Related Artifact — Met Museum';
                document.querySelector('#artifact-caption').textContent = `${objectData.title} (${objectData.objectDate || 'Date unknown'})`;
                document.querySelector('#modal-artifact').style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Met Museum fetch failed:', error);
    }
}


modalClose.addEventListener('click', () => {
    modal.close();
    document.querySelector('#modal-map').innerHTML = '';
});

regionSelect.addEventListener('change', filterAndDisplay);
eraSelect.addEventListener('change', filterAndDisplay);
statusSelect.addEventListener('change', filterAndDisplay);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

document.querySelector('[data-filter="all"]').addEventListener('click', () => {
    regionSelect.value = 'all';
    eraSelect.value = 'all';
    statusSelect.value = 'all';
    filterAndDisplay();
});

async function init() {
    allCities = await getCities();

    regionSelect.value = localStorage.getItem('atlas-region') || 'all';
    eraSelect.value = localStorage.getItem('atlas-era') || 'all';
    statusSelect.value = localStorage.getItem('atlas-status') || 'all';

    filterAndDisplay();
}

init();
