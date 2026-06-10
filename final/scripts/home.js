import { getCities } from "./cities.js";

const featuredGrid = document.querySelector("#featured-grid");

async function startRotator(sectionSelector, imgKey, altKey, storageKey, interval) {
    const section = document.querySelector(sectionSelector);

    if (!section) return;

    const imgs = section.querySelectorAll('img');
    if (imgs.length === 0) return;

    const img1 = imgs[0];
    let img2 = imgs[1];

    if (!img2) {
        img2 = img1.cloneNode(true);
        img1.after(img2);
    }

    try {
        const response = await fetch('data/hero.json');
        const data = await response.json();
        const images = data[imgKey];
        const altText = data[altKey] || 'Image';

        // console.log('key:', imgKey, 'Got images:', images);
        // console.log('JSON keys available:', Object.keys(data));

        if (!images || images.length < 2) return;

        let storedIndex = parseInt(localStorage.getItem(storageKey));
        let currentIndex = !isNaN(storedIndex) && storedIndex < images.length ? storedIndex : 0;

        img1.src = images[currentIndex];
        img1.alt = altText;
        img1.classList.add('active');
        img2.classList.remove('active');

        try {
            localStorage.setItem(storageKey, currentIndex);
        } catch (e) { }

        let showingImg1 = true;
        let nextIndex = (currentIndex + 1) % images.length;

        img2.src = images[nextIndex];
        img2.alt = altText;

        setInterval(() => {
            const currentImg = showingImg1 ? img1 : img2;
            const nextImg = showingImg1 ? img2 : img1;

            currentImg.classList.remove('active');
            nextImg.classList.add('active');

            showingImg1 = !showingImg1;

            currentIndex = nextIndex;
            nextIndex = (nextIndex + 1) % images.length;

            currentImg.src = images[nextIndex];
            currentImg.alt = altText;

            try {
                localStorage.setItem(storageKey, currentIndex);
            } catch (e) { }
        }, interval);
    } catch (error) {
        console.error('Rotator failed:', error);
    }
}

function buildCard(city, index) {
    const card = document.createElement("article");
    card.classList.add("city-card");
    card.style.animationDelay = `${index * 0.15}s`;

    const statusClass = city.status.toLowerCase().replace(/\s+/g, "-");

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
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 },
    );

    document.querySelectorAll(".city-card:not(.visible)").forEach((card) => {
        observer.observe(card);
    });
}

loadFeatured();
startRotator('.hero', 'heroImages', 'heroAlt', 'heroIndex', 7000);
startRotator('.about-teaser', 'aboutTeaserImages', 'aboutTeaserAlt', 'aboutIndex', 7000);
